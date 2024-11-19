import { NextResponse } from 'next/server';
import { sql } from '../../../database/connect';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cityName, lng, lat, rating, text, tags } = body;

    await sql`
      INSERT INTO reviews (city_name, lng, lat, rating, text, tags, created_at)
      VALUES (${cityName}, ${lng}, ${lat}, ${rating}, ${text}, ${JSON.stringify(tags)}, NOW())
    `;

    return NextResponse.json(
      { message: 'Review created successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error saving review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 },
    );
  }
}
