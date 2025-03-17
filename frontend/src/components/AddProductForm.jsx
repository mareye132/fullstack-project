import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductForm = ({ addProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError('');

    if (!productName.trim() || !productPrice.trim()) {
      setError('Please enter both product name and price.');
      return;
    }

    if (isNaN(productPrice) || Number(productPrice) <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    try {
      const newProduct = { name: productName, price: parseFloat(productPrice) };

      if (typeof addProduct !== 'function') {
        setError('Product addition function is not available.');
        return;
      }

      // Updated API URL with trailing slash to prevent Django redirection issue
      const response = await fetch("http://localhost:8000/api/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.detail || "Failed to add product");
      }

      setProductName('');
      setProductPrice('');

      // Optionally call addProduct to update state
      addProduct(newProduct);

      // Navigate after a short delay
      setTimeout(() => navigate('/new-add-products'), 500);
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.message || 'Error adding product. Please try again.');
    }
  };

    
};

export default AddProductForm;
