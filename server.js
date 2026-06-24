const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const { category, cursor, limit = 20 } = req.query;

    let query = `
      SELECT *
      FROM products
    `;

    const values = [];
    const conditions = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (cursor) {
      values.push(cursor);
      conditions.push(`created_at < $${values.length}`);
    }

    if (conditions.length) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += `
      ORDER BY created_at DESC, id DESC
      LIMIT ${parseInt(limit)}
    `;

    const result = await pool.query(query, values);

    const nextCursor =
      result.rows.length > 0
        ? result.rows[result.rows.length - 1].created_at
        : null;

    res.json({
      count: result.rows.length,
      nextCursor,
      products: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});