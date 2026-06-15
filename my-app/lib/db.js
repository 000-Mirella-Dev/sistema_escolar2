import { Pool } from "pg";

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "fantasma",
    database: "sistema_escolar_bd",
});

export default pool;