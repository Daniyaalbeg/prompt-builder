import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

mysql.createConnection('mysql://1n25l8osenk6odza2e7n:pscale_pw_7DjfebMWvE5YXygC7YHdtgWgPzwEXzFKYBKqT5uDdcE@aws.connect.psdb.cloud/prompt-stuff?ssl={"rejectUnauthorized":true}').then((con) => {
	const db = drizzle(con);

	migrate(db, { migrationsFolder: "src/db/migrations-folder" })
		.then(() => {
			console.log("Migrations complete!");
			process.exit(0);
		})
		.catch((err) => {
			console.error("Migrations failed!", err);
			process.exit(1);
		});
})
