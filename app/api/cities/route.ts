import { NextResponse } from 'next/server';
import { sql } from '../../../database/connect';

export async function GET(request: Request) {
  try {
    const cities = await sql`
      SELECT
        id,
        name,
        country,
        description,
        "image_url" AS "imageUrl",
        "map_url" AS "mapUrl",
        lat,
        lng
      FROM cities
      ORDER BY id DESC
    `;

    return NextResponse.json({ cities }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  return NextResponse.json(
    { error: 'Method POST Not Allowed' },
    { status: 405 },
  );
}
