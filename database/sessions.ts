import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};

// Fetch a valid session by checking if the session token is still active
export const getValidSessionToken = cache(
  async (sessionToken: Session['token']) => {
    const [session] = await sql<Session[]>`
    SELECT
      sessions.id,
      sessions.token,
      sessions.expiry_timestamp AS "expiryTimestamp",
      sessions.user_id AS "userId"
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > NOW()
  `;

    return session || null;
  },
);

// Create a new session for the user and return the session token
export const createSession = cache(
  async (userId: User['id'], token: Session['token']) => {
    const [session] = await sql<Session[]>`
    INSERT INTO sessions (
      token,
      user_id,
      expiry_timestamp
    )
    VALUES (
      ${token},
      ${userId},
      now() + interval '24 hours'
    )
    RETURNING
      id,
      token,
      user_id,
      expiry_timestamp
  `;

    // Clean up expired sessions
    await sql`
    DELETE FROM sessions
    WHERE expiry_timestamp < now()
  `;

    return session;
  },
);

// Delete a session by its token, effectively logging the user out
export const deleteSession = cache(async (sessionToken: Session['token']) => {
  const [deletedSession] = await sql<Session[]>`
    DELETE FROM sessions
    WHERE token = ${sessionToken}
    RETURNING token, user_id
  `;

  return deletedSession;
});

// Fetch all active sessions for a user (optional utility)
export const getSessionsForUser = cache(async (userId: number) => {
  const sessions = await sql<Session[]>`
    SELECT
      id,
      token,
      expiry_timestamp AS "expiryTimestamp",
      user_id AS "userId"
    FROM
      sessions
    WHERE
      user_id = ${userId}
      AND expiry_timestamp > NOW()
    ORDER BY expiry_timestamp DESC
  `;

  return sessions;
});
