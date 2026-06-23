const pool = require("./db");

async function test() {
  try {
    const db = await pool.query(
      "SELECT current_database(), current_user, current_schema()"
    );

    console.log("DB INFO:", db.rows);

    const tables = await pool.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_name = 'products'
    `);

    console.log("TABLES:", tables.rows);

  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

test();