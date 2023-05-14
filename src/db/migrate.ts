import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// const connection = mysql.createPool({
//   host: process.env['DATABASE_HOST'],
//   user: process.env['DATABASE_USERNAME'],
// 	password: process.env['DATABASE_PASSWORD'],
//   database: process.env['DATABASE_NAME'],
// 	ssl: {
// 		cert: process.env['SSL_CERT'],
// 		// verifyIdentity: true
// 	},
// 	multipleStatements: true
// });

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
