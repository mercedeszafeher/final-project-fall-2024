import 'server-only';
import postgres, { type Sql } from 'postgres';
import { postgresConfig, setEnvironmentVariables } from '../util/config.js';

setEnvironmentVariables();

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
