import React, { useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, IconButton, TextField, Button, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const NewProduct = ({ products, setProducts }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState("");

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedProduct(products[index]);
  };

  const handleUpdate = () => {
    const updatedProducts = products.map((product, index) =>
      index === editingIndex ? editedProduct : product
    );
    setProducts(updatedProducts);
    setEditingIndex(null);
    setEditedProduct("");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Newly Added Products
      </Typography>
      <List>
        {products.map((product, index) => (
          <ListItem key={index}>
            {editingIndex === index ? (
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  value={editedProduct}
                  onChange={(e) => setEditedProduct(e.target.value)}
                  variant="outlined"
                />
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                  Update
                </Button>
              </Box>
            ) : (
              <>
                <ListItemText primary={product} />
                <IconButton onClick={() => handleEdit(index)}>
                  <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)}>
                  <Delete color="error" />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default NewProduct;