import pg, { Client } from "pg";
import dotenv from "dotenv"

dotenv.config()

const {Pool} = pg;

const pool = new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    ssl: {
    rejectUnauthorized: false,
  },
})


pool .connect()
.then((Client) => {
    console.log("DataBase PostgreSQL Connected Successfully");
    Client.release();
})
.catch((err) =>{
    console.log("DataBase PostgreSQL Error", err.message);
});


export default pool;