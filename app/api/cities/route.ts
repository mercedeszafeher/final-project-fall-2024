import { NextResponse } from 'next/server';
import { getCitiesInsecure } from '../../../database/cities';
import { sql } from '../../../database/connect';

export async function GET() {
  try {
    const cities = await getCitiesInsecure();
    return NextResponse.json({ cities }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
