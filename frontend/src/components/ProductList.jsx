import React, { useState, useEffect } from "react";
import { Button, TextField, CircularProgress, Box, Typography, Grid, Card, CardContent, Snackbar, AppBar, Toolbar, Container } from "@mui/material";
import logo from "../assets/Logo.PNG";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState({ name: "", price: "", description: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError("Error fetching products: " + error.message);
    }
    setLoading(false);
  };

  // Add Product
  const addProduct = async () => {
    if (!product.name || !product.price || !product.description) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setSuccessMessage("Product added successfully");
        setProduct({ name: "", price: "", description: "" });
        setOpenSnackbar(true);
        fetchProducts();
      } else {
        const data = await response.json();
        setError(data.message || "Error adding product");
      }
    } catch (error) {
      setError("Error adding product: " + error.message);
    }
  };

  // Update Product
  const updateProduct = async (id) => {
    const updatedProduct = {
      name: prompt("Enter new product name:", "Updated Name"),
      price: prompt("Enter new price:", "Updated Price"),
      description: prompt("Enter new description:", "Updated Description"),
    };

    // Check if fields are empty
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.description) {
      setError("All fields are required to update");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setSuccessMessage("Product updated successfully");
        setOpenSnackbar(true);
        fetchProducts(); // Re-fetch products after successful update
      } else {
        const data = await response.json();
        setError(data.message || "Error updating product");
      }
    } catch (error) {
      setError("Error updating product: " + error.message);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });

      if (response.ok) {
        setSuccessMessage("Product deleted successfully");
        setOpenSnackbar(true);
        fetchProducts(); // Re-fetch products after successful deletion
      } else {
        const data = await response.json();
        setError(data.message || "Error deleting product");
      }
    } catch (error) {
      setError("Error deleting product: " + error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Header with Navigation */}
      <AppBar position="static">
  <Toolbar sx={{ justifyContent: "space-between" }}>
    <img src={logo} alt="Logo" style={{ width: "150px" }} />
    <Typography variant="h6" color="inherit">MAREYE's STORE MANAGEMENT SYSTEM</Typography> {/* Added Title */}
    <Box>
      <Button color="inherit">Home</Button>
      <Button color="inherit">About Us</Button>
    </Box>
  </Toolbar>
</AppBar>


      <Container>
        {/* Search Bar */}
        <Box sx={{ display: "flex", justifyContent: "right", marginBottom: "1rem" }}>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginRight: "2rem", width: "200px" }}
          />
        </Box>

        {/* Add Product Form */}
        <Box sx={{ marginBottom: "2rem", textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>Add New Product</Typography>
          <TextField label="Product Name" variant="outlined" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} sx={{ marginRight: "1rem", width: "300px" }} />
          <TextField label="Price" variant="outlined" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} sx={{ marginRight: "1rem", width: "300px" }} />
          <TextField label="Description" variant="outlined" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} sx={{ marginRight: "1rem", width: "300px" }} />
          <Button onClick={addProduct} variant="contained" color="primary">Add Product</Button>
        </Box>

        {/* Product List */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ padding: "1rem", textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1" color="textSecondary">${product.price}</Typography>
                    <Typography variant="body2">{product.description}</Typography>

                    {/* Update and Delete Buttons */}
                    <Box sx={{ marginTop: "1rem" }}>
                      <Button variant="contained" color="secondary" size="small" onClick={() => updateProduct(product.id)}>Update</Button>
                      <Button variant="contained" color="error" sx={{ marginLeft: "1rem" }} size="small" onClick={() => deleteProduct(product.id)}>Delete</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Error or Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={successMessage || error}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", padding: "1rem", backgroundColor: "#333", color: "#fff", position: "relative", bottom: 0, width: "100%" }}>
        <Typography variant="body2">Designed by Mareye Zeleke</Typography>
        <Typography variant="body2">Contact Us: Phone: +251906283518 | Email: mareye132@gmail.com</Typography>
      </Box>
    </Box>
  );
};

export default ProductList;
