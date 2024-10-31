import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import type { Session } from '../migrations/00013-sessions';
import { sql } from './connect';

// Fetch a valid session by checking if the session token is still active
export const getValidSessionToken = cache(
  async (sessionToken: Session['token']) => {
    const [session] = await sql<Session[]>`
    SELECT
      sessions.token,
      sessions.user_id
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
  `;

    return session;
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
    RETURNING token, user_id
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
