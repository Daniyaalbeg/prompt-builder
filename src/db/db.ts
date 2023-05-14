// db.ts
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
// import { users } from './schema';

// create the connection
const connection = connect({
  host: process.env['DATABASE_HOST'],
  username: process.env['DATABASE_USERNAME'],
  password: process.env['DATABASE_PASSWORD'],
});

const db = drizzle(connection);

export { db, connection }

// const allUsers = await db.select().from(users);