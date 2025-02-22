import React, { useState } from "react";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";


const App = () => {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <div>
      

      <Container>
        <AddProductForm addProduct={addProduct} />
        <ProductList products={products} />
      </Container>
    </div>
  );
};

export default App;
