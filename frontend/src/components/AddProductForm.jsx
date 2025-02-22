import React, { useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const AddProductForm = ({ addProduct }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem", // Adjust padding if needed
        maxWidth: "500px",
        margin: "0 auto",
        backgroundColor: "#fff", // Background color for the form
      }}
    >
      {/* Error Message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: "1rem" }}>
          {error}
        </Typography>
      )}

      {/* Optionally, you can show loading state */}
      {loading && <CircularProgress size={24} color="inherit" />}
    </Box>
  );
};

export default AddProductForm;
