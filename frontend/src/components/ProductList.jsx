import React, { useState, useEffect } from "react";
import {
  Button, TextField, CircularProgress, Box, Typography, Grid,
  Card, CardContent, Snackbar, Alert, Container, Tooltip
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState({ id: null, name: "", price: "", description: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/products/");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      showMessage("error", `Error fetching products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setOpenSnackbar(true);
  };

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!product.name || !product.price || !product.description) {
      showMessage("error", "All fields are required");
      return;
    }

    const priceValue = parseFloat(product.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      showMessage("error", "Price must be a valid number");
      return;
    }

    try {
      const url = isEditing
        ? `http://localhost:8000/api/products/${product.id}/`
        : "http://localhost:8000/api/products/";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, price: priceValue }),
      });

      if (!response.ok) throw new Error(`Error ${isEditing ? "updating" : "adding"} product`);

      showMessage("success", `Product ${isEditing ? "updated" : "added"} successfully`);
      resetForm();
      fetchProducts();
    } catch (error) {
      showMessage("error", `Error ${isEditing ? "updating" : "adding"} product: ${error.message}`);
    }
  };

  const resetForm = () => {
    setProduct({ id: null, name: "", price: "", description: "" });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await fetch(`http://localhost:8000/api/products/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || `Failed to delete (status: ${response.status})`);
    }

    console.log(`Product with ID ${id} deleted successfully`);

    // Immediately update state to remove the deleted product
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));

  } catch (error) {
    console.error("Delete Error:", error.message);
  }
};

  

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <Typography variant="h5">Product Management</Typography>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "250px" }}
          />
        </Box>

        <Box sx={{ marginBottom: "2rem", textAlign: "center" }}>
          <Typography variant="h6">{isEditing ? "Edit Product" : "Add New Product"}</Typography>
          {['name', 'price', 'description'].map((field) => (
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              variant="outlined"
              name={field}
              value={product[field]}
              onChange={handleInputChange}
              sx={{ margin: "1rem", width: "250px" }}
            />
          ))}
          <Tooltip title={isEditing ? "Update Product" : "Add Product"}>
            <Button onClick={handleSubmit} variant="contained" color={isEditing ? "secondary" : "primary"}>
              {isEditing ? <Edit /> : <Add />}
            </Button>
          </Tooltip>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <Card sx={{ padding: "1rem", textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h6">{p.name}</Typography>
                    <Typography variant="body1" color="textSecondary">${p.price}</Typography>
                    <Typography variant="body2">{p.description}</Typography>
                    <Box sx={{ marginTop: "1rem" }}>
                      <Button variant="contained" color="secondary" onClick={() => handleEdit(p)}>
                        <Edit />
                      </Button>
                      <Button variant="contained" color="error" sx={{ marginLeft: "1rem" }} onClick={() => handleDelete(p.id)}>
                        <Delete />
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
          <Alert severity={message.type}>{message.text}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ProductList;
