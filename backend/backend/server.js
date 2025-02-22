const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

// PostgreSQL database connection setup
const pool = new Pool({
  user: "postgres", // Replace with your PostgreSQL username
  host: "localhost",
  database: "store_db", // Replace with your database name
  password: "Maru@132", // Replace with your PostgreSQL password
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM store_product");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Add a New Product
app.post("/api/products", async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO store_product (name, price, description) VALUES ($1, $2, $3) RETURNING *",
      [name, price, description]
    );
    res.status(201).json(result.rows[0]); // Return the newly added product
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product" });
  }
});

// Update a Product by ID
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ message: "All fields are required for update!" });
  }

  try {
    const result = await pool.query(
      "UPDATE store_product SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *",
      [name, price, description, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: result.rows[0] });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
});

// Delete a Product by ID
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM store_product WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", deletedProduct: result.rows[0] });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
