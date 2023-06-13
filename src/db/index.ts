// db.ts
import {
  PlanetScaleDatabase,
  drizzle,
} from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as schema from "./schema";

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

let db: PlanetScaleDatabase<typeof schema> | undefined = undefined;

export const getDB = () => {
  if (!db) {
    db = drizzle(connection, { schema: schema });
  }

  return db;
};

export { connection };
