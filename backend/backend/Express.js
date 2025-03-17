const express = require("express");
const pool = require("./db"); // PostgreSQL connection
const app = express();

app.use(express.json()); // Parse JSON body

// ✅ Delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received DELETE request for product ID:", id);  // Log the product ID

    // Check if the product ID exists
    console.log("Checking if product with ID exists...");
    const checkProduct = await pool.query("SELECT * FROM store_product WHERE id = $1", [id]);
    console.log("Product check result:", checkProduct.rows); // Log the check result
    if (checkProduct.rowCount === 0) {
      console.log(`Product with ID ${id} not found.`);  // Log product not found
      return res.status(404).json({ error: "Product not found" });  // If product does not exist
    }

    // Proceed with deleting the product
    console.log("Product found, proceeding with deletion...");
    const result = await pool.query("DELETE FROM store_product WHERE id = $1 RETURNING *", [id]);
    console.log("Delete query result:", result.rows); // Log the result of delete query

    if (result.rowCount === 0) {
      console.log(`Failed to delete product with ID ${id}.`);  // Log deletion failure
      return res.status(404).json({ error: "Product not found during deletion" });
    }

    console.log("Deleted product:", result.rows[0]);  // Log the deleted product
    res.json({ message: "Product deleted successfully", product: result.rows[0] });
  } catch (err) {
    console.error("Error during deletion:", err.message);  // Detailed error log
    res.status(500).json({ error: "Error deleting product" });
  }
});

// Run the Express server on port 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
