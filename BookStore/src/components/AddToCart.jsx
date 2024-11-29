import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Assuming you want to redirect on "Buy Now"
import { add_book, update_quantity } from "../slice/cartSlice";
import { useDispatch } from "react-redux";
const AddToCart = ({book}) => {
  const [quantity, setQuantity] = useState(1); // Default quantity set to 1
  const navigate = useNavigate(); // Hook to navigate on "Buy Now"
  const dispatch = useDispatch()

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    // dispatch(update_quantity({ id: book.id, quantity: quantity }));
  };

  const handleAddToCart = () => {
    dispatch(add_book({newBook:book, quantity:quantity}))
  };


  const handleBuyNow = () => {
    navigate("/checkout"); // Assuming "/checkout" is the route for checkout
  };

  return (
    <Box
      sx={{
        width: "300px", // Width of the box
        padding: "20px",
        borderRadius: "12px", // Rounded borders
        boxShadow: 3,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Add to Cart
      </Typography>

      {/* Quantity Selector */}
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        sx={{ width: "100%", marginBottom: "16px" }}
        inputProps={{ min: 1 }} // Ensure the input cannot be less than 1
      />

      {/* Add to Cart Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddToCart}
        sx={{ padding: "10px", marginBottom: "8px" }}
        disabled={quantity < 1} // Disable button if quantity is invalid
      >
        Add to Cart
      </Button>

      {/* Buy now Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleBuyNow}
        sx={{
          padding: "10px",
          marginTop: "15px",
          backgroundColor: "#FF0000", // Red color for the "Buy Now" button
        }}
        disabled={quantity < 1} // Disable button if quantity is invalid
      >
        Buy Now
      </Button>
    </Box>
  );
};

export default AddToCart;
