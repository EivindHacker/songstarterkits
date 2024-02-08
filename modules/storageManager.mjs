//import pg from "pg";
//import {Client} from "pg";

if (process.env.DB_CONNECTIONSTRING == undefined) {
	throw "You forgot the db connection string";
}

const dbConnectionString = process.env.DB_CONNECTIONSTRING === undefined;

// Store user to DBnod
//const statement = `INSERT INTO "public"."Users"("email", "name", "password") VALUES('${this.email}','${this.name}','${this.pswHash}','${this.credits}',)`;

class DBManager {
	#credentials = "";

	constructor(connectionstring) {
		this.#credentials = {
			connectionstring,
			ssl: {
				rejectUnauthorized: process.env.LIVE || false,
			},
		};
	}

	async createUser(user) {
		const client = new Client(this.#credentials);

		try {
			await client.connect();

			//$1 $2 $3 RETURNING id;
			const rows = await client.query(
				`INSERT INTO "public"."Users"("name", "email", "password") VALUES($1::Text, $2::Text, $3::Text)`,
				user.name,
				user.email,
				user.pswHash
			);

			if (output.row.lenght === 1) {
				user.id = output.rows[0].id;
			}
		} catch (err) {
			console.log(err);
		}

		return user;
	}
}

export default new DBManager(process.env.DB_CONNECTIONSTRING);
