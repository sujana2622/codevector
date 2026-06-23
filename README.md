# Product Browser Backend

## Overview

This project is a backend application built with **Node.js**, **Express.js**, and **PostgreSQL**. It allows users to browse a catalog of approximately **200,000 products**, filter products by category, and paginate through results efficiently.

The application is designed to handle large datasets while maintaining good performance and consistent results even when product data changes during browsing.

---

## Features

* Browse products ordered by newest first
* Filter products by category
* Cursor-based pagination
* PostgreSQL database with 200,000 seeded products
* Fast query performance using indexes
* REST API built with Express.js

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* pg (PostgreSQL driver)
* dotenv

---

## Database Schema

### Products Table

| Column     | Type                  |
| ---------- | --------------------- |
| id         | BIGSERIAL PRIMARY KEY |
| name       | VARCHAR(255)          |
| category   | VARCHAR(100)          |
| price      | NUMERIC(10,2)         |
| created_at | TIMESTAMP             |
| updated_at | TIMESTAMP             |

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd codevector
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create PostgreSQL Database

```sql
CREATE DATABASE products_db;
```

### 4. Configure Environment Variables

Create a `.env` file:

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=products_db
PORT=3000
```

### 5. Create Products Table

```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

### 6. Create Indexes

```sql
CREATE INDEX idx_products_created_at
ON products(created_at DESC);

CREATE INDEX idx_products_category_created
ON products(category, created_at DESC);
```

### 7. Seed Database

```bash
node seed.js
```

This script generates approximately 200,000 products.

### 8. Start Server

```bash
node server.js
```

Server runs on:

```text
http://localhost:3000
```

---

## API Endpoints

### Get Products

```http
GET /products
```

Returns the latest products.

### Filter by Category

```http
GET /products?category=Books
```

Returns products belonging to the specified category.

### Limit Results

```http
GET /products?limit=10
```

Returns only the specified number of products.

### Cursor Pagination

```http
GET /products?cursor=<timestamp>
```

Returns the next page of products after the provided cursor.

### Health Check

```http
GET /health
```

Returns server health status.

---

## Pagination Strategy

This project uses **Cursor-Based Pagination** instead of OFFSET pagination.

### Why Cursor Pagination?

OFFSET pagination can:

* Become slow on large datasets
* Return duplicate records
* Skip records when new data is inserted

Cursor pagination solves these problems by:

* Using the last product's timestamp as a cursor
* Maintaining consistent ordering
* Improving performance for large datasets

Products are ordered by:

```sql
ORDER BY created_at DESC, id DESC
```

This ensures stable and predictable pagination.

---

## Performance Considerations

* Database indexes added for fast filtering and sorting
* Batch inserts used during seeding
* Cursor-based pagination for scalability
* Optimized PostgreSQL queries

---

## Project Structure

```text
codevector/
│
├── server.js
├── seed.js
├── db.js
├── package.json
├── README.md
├── .gitignore
└── .env
```

---

## Sujana

Backend Internship Assignment Submission

Built using Node.js, Express.js, and PostgreSQL.
