'use server';

import { cookies } from 'next/headers';
import { deleteSession } from '../../../database/sessions';

export async function logout() {
  // 1. Get the session token from the cookie

  const cookieStore = await cookies();

  const token = cookieStore.get('sessionToken');

  if (token) {
    // 2. Delete the session from the database based on the token
    await deleteSession(token.name);

    // 3. Delete the session cookie from the browser
    cookieStore.delete(token.value);
  }
  return;
}