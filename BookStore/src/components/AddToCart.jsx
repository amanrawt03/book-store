import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Assuming you want to redirect on "Buy Now"
import { add_book, update_quantity } from "../slice/cartSlice";
import { useDispatch } from "react-redux";
import '../styleSheet/AddToCart.css'

const AddToCart = ({ book }) => {
  const [quantity, setQuantity] = useState(1); // Default quantity set to 1
  const navigate = useNavigate(); // Hook to navigate on "Buy Now"
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    // dispatch(update_quantity({ id: book.id, quantity: quantity }));
  };

  const handleAddToCart = () => {
    dispatch(add_book({ newBook: book, quantity: quantity }));
  };

  const handleBuyNow = () => {
    navigate("/checkout"); // Assuming "/checkout" is the route for checkout
  };

  return (
    <Box className="addToCartContainer">
      <Typography variant="h6" className="addToCartTitle">
        Add to Cart
      </Typography>

      {/* Quantity Selector */}
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        className="quantityInput"
        inputProps={{ min: 1 }} // Ensure the input cannot be less than 1
      />

      {/* Add to Cart Button */}
      <Button
        variant="contained"
        color="primary" // Using the primary color from the theme (Navbar color)
        fullWidth
        onClick={handleAddToCart}
        className="addToCartButton"
        disabled={quantity < 1} // Disable button if quantity is invalid
      >
        Add to Cart
      </Button>

      {/* Buy Now Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleBuyNow}
        className="buyNowButton"
        disabled={quantity < 1} // Disable button if quantity is invalid
      >
        Buy Now
      </Button>
    </Box>
  );
};

export default AddToCart;
