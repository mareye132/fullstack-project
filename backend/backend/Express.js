const express = require("express");
const pool = require("./db"); // PostgreSQL connection
const app = express();

app.use(express.json()); // Parse JSON body

// ✅ Get all products
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM store_product");  // Use store_product table
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a product
app.post("/api/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = await pool.query(
      "INSERT INTO store_product (name, price, description) VALUES ($1, $2, $3) RETURNING *",
      [name, price, description]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error adding product" });
  }
});

// ✅ Update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const result = await pool.query(
      "UPDATE store_product SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *",
      [name, price, description, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error updating product" });
  }
});

// ✅ Delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received DELETE request for product ID:", id);  // Log the product ID

    // Check if the product ID exists
    const checkProduct = await pool.query("SELECT * FROM store_product WHERE id = $1", [id]);
    if (checkProduct.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });  // If product does not exist
    }

    // Proceed with deleting the product
    const result = await pool.query("DELETE FROM store_product WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found during deletion" });
    }

    console.log("Deleted product:", result.rows[0]);  // Log the deleted product
    res.json({ message: "Product deleted successfully", product: result.rows[0] });
  } catch (err) {
    console.error("Error during deletion:", err.message);  // Detailed error log
    res.status(500).json({ error: "Error deleting product" });
  }
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
