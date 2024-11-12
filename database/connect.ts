import 'server-only';
import { config } from 'dotenv-safe';
import postgres, { type Sql } from 'postgres';
import { postgresConfig } from '../util/config.js';

config();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}

function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres(postgresConfig);
    console.log('Connected to the database successfully.');
  } else {
    console.log('Using existing database connection.');
  }

  return globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
