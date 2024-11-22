import { sql } from '../database/connect';

const populateCoordinates = async () => {
  const cities = await sql<{ id: number; name: string }[]>`
    SELECT id, name FROM cities WHERE lat IS NULL OR lng IS NULL
  `;

  for (const city of cities) {
    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(city.name)}.json?key=YOUR_API_KEY`,
      );
      const data = await response.json();
      const feature = data.features?.[0];

      if (feature) {
        const { center } = feature;
        const [lng, lat] = center;

        await sql`
          UPDATE cities
          SET lat = ${lat}, lng = ${lng}
          WHERE id = ${city.id}
        `;
        console.log(`Updated coordinates for ${city.name}: [${lat}, ${lng}]`);
      }
    } catch (error) {
      console.error(`Failed to fetch coordinates for ${city.name}:`, error);
    }
  }
};

populateCoordinates();
