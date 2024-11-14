import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSession } from '../../../../database/sessions';
import {
  createUserWithBasicInfo,
  getUserByEmail,
  getUserInsecure,
} from '../../../../database/users';
import {
  type User,
  userSchema,
} from '../../../../migrations/00000-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';

export type RegisterResponseBody =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<RegisterResponseBody>> {
  // Parse the request body
  const requestBody = await request.json();

  // Validate the user data with Zod
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

  // Check if the user already exists in the database
  const existingUser = await getUserInsecure(result.data.username);
  const existingEmail = await getUserByEmail(result.data.email);

  if (existingUser) {
    return NextResponse.json(
      {
        errors: [{ message: 'Username already taken' }],
      },
      { status: 400 },
    );
  }

  if (existingEmail) {
    return NextResponse.json(
      { errors: [{ message: 'Email already registered' }] },
      { status: 400 },
    );
  }

  // Hash the password securely
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // Create a new user in the database
  const newUser = await createUserWithBasicInfo(
    result.data.username,
    result.data.email,
    passwordHash,
  );

  // Check if user creation was successful
  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'User registration failed' }] },
      { status: 500 },
    );
  }

  // Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // Create the session record
  const session = await createSession(newUser.id, token);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Sessions creation failed' }] },
      {
        status: 401,
      },
    );
  }

  (await cookies()).set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // Return the new user's information, excluding sensitive fields like password
  return NextResponse.json({
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  });
}
