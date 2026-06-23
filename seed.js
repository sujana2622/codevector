const pool = require("./db");

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Home",
  "Toys",
  "Beauty",
  "Automotive"
];

function randomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

function randomPrice() {
  return (Math.random() * 10000).toFixed(2);
}

async function seed() {
    const dbInfo = await pool.query(
    "SELECT current_database(), current_user"
  );

  console.log(dbInfo.rows);

  const total = 200000;
  const batchSize = 5000;
  

  console.log("Seeding started...");

  const test = await pool.query("SELECT COUNT(*) FROM products");
  console.log("Table exists. Current rows:", test.rows[0].count);

  for (let start = 0; start < total; start += batchSize) {
    const values = [];
    const placeholders = [];

    for (let i = 0; i < batchSize; i++) {
      const idx = start + i;

      const name = `Product ${idx + 1}`;
      const category = randomCategory();
      const price = randomPrice();

      const createdAt = new Date(
        Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
      );

      const updatedAt = createdAt;

      const pos = i * 5;

      placeholders.push(
        `($${pos + 1},$${pos + 2},$${pos + 3},$${pos + 4},$${pos + 5})`
      );

      values.push(
        name,
        category,
        price,
        createdAt,
        updatedAt
      );
    }

    await pool.query(
      `
      INSERT INTO products
      (name, category, price, created_at, updated_at)
      VALUES ${placeholders.join(",")}
      `,
      values
    );

    console.log(`Inserted ${start + batchSize}`);
  }

  console.log("200,000 Products Inserted");

  process.exit();
}

seed().catch((err) => {
  console.error("SEED ERROR:");
  console.error(err);
});