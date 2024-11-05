import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSession } from '../../../../database/sessions';
import { getUserWithPasswordHashInsecure } from '../../../../database/users';
import {
  type User,
  userSchema,
} from '../../../../migrations/00000-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';

export type LoginResponseBody =
  | {
      user: { username: User['username'] };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<LoginResponseBody>> {
  // 1. Parse the user data from the request body
  const requestBody = await request.json();

  // 2. Validate the user data with Zod schema
  const result = userSchema.safeParse(requestBody);

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

  // 3. Verify user credentials: retrieve user by username
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.username,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        errors: [{ message: 'Username or password is invalid' }],
      },
      { status: 400 },
    );
  }

  // 4. Validate the password by comparing with the stored hash
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        errors: [{ message: 'Username or password is invalid' }],
      },
      { status: 400 },
    );
  }

  // 5. Generate a secure session token
  const token = crypto.randomBytes(100).toString('base64');

  // 6. Create a session in the database with the token
  const session = await createSession(userWithPasswordHash.user_id, token);

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Error creating session' }],
      },
      { status: 500 },
    );
  }

  // 7. Set a secure session cookie
  (await cookies()).set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // 8. Respond with the user's basic information (excluding password hash)
  return NextResponse.json({
    user: {
      username: userWithPasswordHash.username,
    },
  });
}
