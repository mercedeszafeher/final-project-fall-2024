import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../database/connect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const cities = await sql`
      SELECT
        name,
        country,
        description,
        "image_url" AS "imageUrl",
        "map_url" AS "mapUrl"
      FROM cities
      ORDER BY city_id DESC
    `;

    res.status(200).json({ cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
