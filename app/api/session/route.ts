import { NextResponse } from 'next/server';
import { getValidSessionToken } from '../../../database/sessions';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return NextResponse.json(
      { error: 'No session token found' },
      { status: 401 },
    );
  }

  const sessionToken = cookieHeader
    .split('; ')
    .find((row) => row.startsWith('sessionToken='))
    ?.split('=')[1];

  if (!sessionToken) {
    return NextResponse.json(
      { error: 'No session token found' },
      { status: 401 },
    );
  }

  const session = await getValidSessionToken(sessionToken);

  if (!session) {
    return NextResponse.json(
      { error: 'Invalid or expired session' },
      { status: 401 },
    );
  }

  return NextResponse.json({ userId: session.userId }, { status: 200 });
}
