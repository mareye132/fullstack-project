// api.js

export const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/api/products");
  return response.json();
};

export const addProduct = async (product) => {
  const response = await fetch("http://localhost:5000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (response.ok) {
    return await response.json(); // Return the added product, including its ID
  } else {
    throw new Error("Failed to add product");
  }
};
