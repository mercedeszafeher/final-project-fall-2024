import type { Sql } from 'postgres';

const users = [
  {
    user_id: 1,
    username: 'emilyjones',
    email: 'emilyjones@example.com',
    password: 'hashed_password_012',
    profile_pic: 'https://example.com/profile_pic4.jpg',
    location: 'Tokyo, Japan',
    bio: 'Tech lover and city explorer.',
    created_at: new Date('2023-04-05T09:20:00Z'),
  },
  {
    user_id: 2,
    username: 'michaelbrown',
    email: 'michaelbrown@example.com',
    password: 'hashed_password_345',
    profile_pic: 'https://example.com/profile_pic5.jpg',
    location: 'Sydney, Australia',
    bio: 'Blogger with a love for vibrant city life.',
    created_at: new Date('2023-05-25T16:00:00Z'),
  },
  {
    user_id: 3,
    username: 'alexsmith',
    email: 'alexsmith@example.com',
    password: 'hashed_password_789',
    profile_pic: 'https://example.com/profile_pic3.jpg',
    location: 'Berlin, Germany',
    bio: 'Photographer with a passion for architecture.',
    created_at: new Date('2023-03-10T14:45:00Z'),
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          username,
          email,
          password_hash,
          profile_pic,
          bio,
          created_at
      )
      VALUES (
        ${user.username},
        ${user.email},
        ${user.password},
        ${user.profile_pic},
        ${user.bio},
        ${user.created_at}
      )
  `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`DELETE FROM users WHERE user_id = ${user.user_id}`;
  }
}
