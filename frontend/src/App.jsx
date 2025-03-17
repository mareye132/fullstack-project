import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Button, Box, CssBaseline, Menu, MenuItem } from "@mui/material";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import AboutUs from "./components/AboutUs";
import logo from "./assets/Logo.PNG";

const App = () => {
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Function to add a new product
  const addProduct = (product) => {
    try {
      if (!product.name || !product.price) {
        throw new Error("Product name and price are required.");
      }
      setProducts((prevProducts) => [...prevProducts, product]); // Proper state update
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert(`Error adding product: ${error.message}`);
    }
  };

  // Handle menu opening and closing
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsHovered(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsHovered(false);
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "#388E3C",
          color: "white",
          textAlign: "center",
          position: "fixed",
          top: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "300px", height: "auto" }} />

          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Injibara University Store Management System
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About Us
            </Button>

            {/* Products Menu with Hover Indicator */}
            <Box onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose} sx={{ position: "relative" }}>
              <Button
                color="inherit"
                sx={{
                  textTransform: "none",
                  backgroundColor: isHovered ? "rgba(255,255,255,0.2)" : "transparent",
                  borderRadius: "4px",
                }}
              >
                Products {isHovered ? "˄" : "˅"}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} MenuListProps={{ onMouseLeave: handleMenuClose }}>
                <MenuItem onClick={handleMenuClose} component={Link} to="/sold-products">
                  Sold Products
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/expired-products">
                  Expired Products
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/new-add-products">
                  New Add Products
                </MenuItem>
              </Menu>
            </Box>

            <Button color="inherit" component="a" href="https://www.inu.edu.et/" target="_blank" rel="noopener noreferrer">
              University Website
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: "6rem", marginBottom: "2rem" }}>
        <Routes>
          <Route path="/" element={<><AddProductForm addProduct={addProduct} /><ProductList products={products} /></>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/sold-products" element={<h2>Sold Products Page</h2>} />
          <Route path="/expired-products" element={<h2>Expired Products Page</h2>} />
          <Route path="/new-add-products" element={<ProductList products={products} />} />
        </Routes>
      </Container>

      <Box
        sx={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "#388E3C",
          color: "white",
          textAlign: "center",
          position: "fixed",
          bottom: 0,
        }}
      >
        <Typography variant="body2">
          © 2025 Injibara University Store Management System. All rights reserved.
          <br />
          Contact: Phone: +251-(0)58-227-21-11 Email: injibarauniversity@inu.edu.et, 40 PO Box, Injibara, Ethiopia.
        </Typography>
      </Box>
    </Router>
  );
};

export default App;
