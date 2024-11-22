import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserBySessionToken } from '../../../database/users';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No session token found' },
        { status: 401 },
      );
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 },
      );
    }

    return NextResponse.json({ userId: user.id }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/session:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
