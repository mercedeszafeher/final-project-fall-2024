import { cache } from 'react';
import type { Session } from '../migrations/00009-sessions';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_pic: string | null;
  location: string | null;
  bio: string | null;
  created_at: Date;
};

export type UserWithPasswordHash = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
};

// Fetch a user securely by session token
export const getUserBySessionToken = cache(
  async (sessionToken: Session['token']) => {
    const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username,
      users.email,
      users.profile_pic,
      users.location,
      users.bio
    FROM
      users
      INNER JOIN sessions ON users.id = sessions.user_id
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > NOW()
  `;

    return user;
  },
);

// Fetch user by ID
export async function getUserById(id: number) {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username,
      email,
      profile_pic,
      location,
      bio
    FROM
      users
    WHERE
      id = ${id}
  `;

  return user;
}

// Fetch a user insecurely by username
export const getUserInsecure = cache(async (username: User['username']) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;

  return user;
});

// Fetch a user by their email address
export const getUserByEmail = cache(async (email: User['email']) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username,
      email
    FROM
      users
    WHERE
      email = ${email}
  `;

  return user;
});

// Fetch user by email with password hash
export const getUserWithPasswordHashInsecureByEmail = cache(
  async (email: User['email']) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        id,
        username,
        email,
        password_hash AS "passwordHash"
      FROM
        users
      WHERE
        email = ${email}
    `;

    return user;
  },
);

// Fetch a user with their password hash by username (for login validation)
export const getUserWithPasswordHashInsecure = cache(
  async (username: User['username']) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        id,
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

// Fetch a user with their password hash by ID
export async function getUserWithPasswordHashById(id: number) {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      id,
      username,
      password_hash AS "passwordHash"
    FROM
      users
    WHERE
      id = ${id}
  `;

  return user;
}

// Create a new user with full information, returns the user's ID and username
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

// Create a new user with only username and password hash
export const createUserWithBasicInfo = cache(
  async (
    username: User['username'],
    email: User['email'],
    passwordHash: UserWithPasswordHash['passwordHash'],
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO users (
        username,
        email,
        password_hash,
        created_at
      )
      VALUES (
        ${username},
        ${email},
        ${passwordHash},
        now()
      )
      RETURNING id, username, email
    `;

    return user;
  },
);

// Update user by ID
export async function updateUserById(
  id: number,
  username: string,
  email: string,
  location: string | null,
  bio: string | null,
): Promise<User | undefined> {
  const [user] = await sql<User[]>`
    UPDATE users
    SET
      username = ${username},
      email = ${email},
      location = ${location},
      bio = ${bio}
    WHERE
      id = ${id}
    RETURNING
      id,
      username,
      email,
      profile_pic,
      location,
      bio
  `;

  return user;
}

// Update user's password by ID
export async function updateUserPasswordById(id: number, passwordHash: string) {
  const [user] = await sql<User[]>`
    UPDATE users
    SET
      password_hash = ${passwordHash}
    WHERE
      id = ${id}
    RETURNING
      id,
      username,
      email,
      profile_pic,
      location,
      bio
  `;

  return user;
}
