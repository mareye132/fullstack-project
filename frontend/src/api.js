const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/products/";

export const fetchProducts = async () => {
  try {
    // Send GET request to fetch products
    const response = await fetch(API_URL, {
      method: "GET", // Explicitly set GET method
      headers: {
        "Content-Type": "application/json", // Ensure the server knows you're expecting JSON
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    // Parse the response as JSON
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products: " + error.message);
  }
};

export const addProduct = async (product) => {
  try {
    // Send POST request to add a new product
    const response = await fetch(API_URL, {
      method: "POST", // Explicitly set POST method
      headers: {
        "Content-Type": "application/json", // Ensure you're sending JSON data
      },
      body: JSON.stringify(product), // Send the product data as a JSON string
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    // Parse the response as JSON and return it
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Error adding product: " + error.message);
  }
};
