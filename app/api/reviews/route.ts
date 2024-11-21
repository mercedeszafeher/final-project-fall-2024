import { NextResponse } from 'next/server';
import { sql } from '../../../database/connect';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, cityId, neighborhoodId, lng, lat, rating, text, tags } =
      body;

    await sql`
      INSERT INTO reviews (
        user_id,
        city_id,
        neighborhood_id,
        lng,
        lat,
        rating,
        text,
        tags,
        created_at
        )
      VALUES (
        ${userId},
        ${cityId},
        ${neighborhoodId},
        ${lng},
        ${lat},
        ${rating},
        ${text},
        ${JSON.stringify(tags)},
        NOW()
        )
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

export async function GET() {
  try {
    const reviews = await sql`
      SELECT
        user_id,
        city_id,
        neighborhood_id,
        lng,
        lat,
        rating,
        text,
        tags,
        created_at
      FROM
        reviews
      ORDER BY
        created_at DESC
      LIMIT 10
    `;

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 },
    );
  }
}
