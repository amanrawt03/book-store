import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh", // Full height for centering
            padding: 2,
            backgroundColor: "#f5f5f5", // Light background color
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Order Successful!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Thank you for your order.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoHome}
            sx={{ marginTop: 2 }} // Add some margin to the button
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default OrderConfirmation;
