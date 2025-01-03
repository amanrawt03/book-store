import React from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Stack,
  Grid,
  Chip
} from "@mui/material";
import { useSelector } from "react-redux";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const SectionTitle = ({ icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
    {icon}
    <Typography variant="h6" fontWeight="600">
      {text}
    </Typography>
  </Box>
);

const PriceDetail = ({ label, value, isTotal }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      py: 0.5,
      ...(isTotal && {
        pt: 2,
        borderTop: '1px dashed',
        borderColor: 'divider',
        mt: 1
      })
    }}
  >
    <Typography color={isTotal ? 'text.primary' : 'text.secondary'} fontWeight={isTotal ? 600 : 400}>
      {label}
    </Typography>
    <Typography fontWeight={isTotal ? 600 : 400}>
      ₹{value.toFixed(2)}
    </Typography>
  </Box>
);

export const OrderSummary = ({ selectedAddress, paymentMethod }) => {
  const cart = useSelector((state) => state.cart.cartArray);
  
  const calculateSubtotal = () => {
    return cart.reduce((total, book) => {
      return total + (book.volumeInfo.pageCount * 3 * book.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryCharge = 40;
  const total = subtotal + deliveryCharge;

  return (
    <Paper sx={{ p: 3, bgcolor: 'background.paper' }} elevation={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Order Summary
      </Typography>
      
      <Stack spacing={3}>
        {/* Delivery Address Section */}
        <Box>
          <SectionTitle 
            icon={<LocationOnIcon color="primary" />} 
            text="Delivery Address" 
          />
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={0.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" fontWeight="600">
                  {selectedAddress?.type}
                </Typography>
                <Chip size="small" label="Delivering Here" color="primary" />
              </Box>
              <Typography color="text.secondary">
                {selectedAddress?.street}
              </Typography>
              <Typography color="text.secondary">
                {selectedAddress?.city}, {selectedAddress?.State}
              </Typography>
              <Typography color="text.secondary">
                {selectedAddress?.Country} - {selectedAddress?.postalCode}
              </Typography>
            </Stack>
          </Paper>
        </Box>

        {/* Order Details Section */}
        <Box>
          <SectionTitle 
            icon={<MenuBookIcon color="primary" />} 
            text="Order Details" 
          />
          <Stack spacing={2}>
            {cart?.map((book, index) => (
              <Paper 
                key={index}
                variant="outlined" 
                sx={{ p: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="subtitle1" fontWeight="600">
                      {book.volumeInfo.title}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      by {book.volumeInfo.authors[0]}
                    </Typography>
                    <Typography color="text.secondary">
                      Quantity: {book.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ textAlign: { sm: 'right' } }}>
                    <Typography variant="h6" color="primary.main">
                      ₹{(book.volumeInfo.pageCount * 3).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* Payment Details Section */}
        <Box>
          <SectionTitle 
            icon={<PaymentIcon color="primary" />} 
            text="Payment Details" 
          />
          <Paper variant="outlined" sx={{ p: 2 }}>
            <PriceDetail label="Subtotal" value={subtotal} />
            <PriceDetail label="Delivery Charge" value={deliveryCharge} />
            <PriceDetail label="Total Amount" value={total} isTotal />
            
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Typography color="text.secondary">
                Payment Method: {' '}
                <Chip 
                  label={paymentMethod === "cod" ? "Cash on Delivery" : "Unknown"}
                  size="small"
                  color="default"
                />
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Delivery Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <LocalShippingIcon color="action" />
          <Typography variant="body2" color="text.secondary">
            Expected delivery within 5-7 business days
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default OrderSummary;