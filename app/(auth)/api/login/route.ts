import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getUserWithPasswordHashInsecureByEmail } from '../../../../database/users';
import { type User } from '../../../../migrations/00000-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';

export type LoginResponseBody =
  | {
      user: { username: User['username'] };
    }
  | {
      errors: { message: string }[];
    };

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(
  request: Request,
): Promise<NextResponse<LoginResponseBody>> {
  // Parse the user data from the request body
  const requestBody = await request.json();

  // Validate the user data with Zod schema
  const result = loginSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: result.error.issues.map((issue) => ({
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  // Verify user credentials: retrieve user by username
  const userWithPasswordHash = await getUserWithPasswordHashInsecureByEmail(
    result.data.email,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        errors: [{ message: 'Email or password is invalid' }],
      },
      { status: 400 },
    );
  }

  // Validate the password by comparing with the stored hash
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        errors: [{ message: 'Email or password is invalid' }],
      },
      { status: 400 },
    );
  }

  // Generate a secure session token.
  const token = crypto.randomBytes(100).toString('base64');

  // Create a session in the database with the token.
  const session = await createSession(userWithPasswordHash.id, token);

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Error creating session' }],
      },
      { status: 401 },
    );
  }

  // Set a secure session cookie
  (await cookies()).set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // Respond with the user's basic information (excluding password hash)
  return NextResponse.json({
    user: {
      username: userWithPasswordHash.username,
    },
  });
}
