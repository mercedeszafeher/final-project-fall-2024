import { cache } from 'react';
import type { Session } from '../migrations/00013-sessions';
import { sql } from './connect';

export type User = {
  user_id: number;
  username: string;
  email: string;
  password: string;
  profile_pic: string | null;
  location: string | null;
  bio: string | null;
  created_at: Date;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

// Fetch a user securely by session token
export const getUser = cache(async (sessionToken: Session['token']) => {
  const [user] = await sql<User[]>`
    SELECT
      users.user_id,
      users.username
    FROM
      users
      INNER JOIN sessions ON (
        sessions.user_id = users.user_id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      sessions.token = ${sessionToken}
  `;

  return user;
});

// Fetch a user insecurely by username
export const getUserInsecure = cache(async (username: User['username']) => {
  const [user] = await sql<User[]>`
    SELECT
      user_id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;

  return user;
});

// Create a new user with a hashed password, returns the user's ID and username
export const createUser = cache(
  async (
    username: User['username'],
    email: User['email'],
    passwordHash: UserWithPasswordHash['passwordHash'],
    profilePic: User['profile_pic'],
    location: User['location'],
    bio: User['bio'],
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO users (
        username,
        email,
        password_hash,
        profile_pic,
        location,
        bio,
        created_at
      )
      VALUES (
        ${username},
        ${email},
        ${passwordHash},
        ${profilePic},
        ${location},
        ${bio},
        now()
      )
      RETURNING user_id, username
    `;

    return user;
  },
);

// Fetch a user with their password hash by username (for login validation)
export const getUserWithPasswordHashInsecure = cache(
  async (username: User['username']) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        user_id,
        username,
        password_hash
      FROM
        users
      WHERE
        username = ${username}
    `;

    return user;
  },
);
