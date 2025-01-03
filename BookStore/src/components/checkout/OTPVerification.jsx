import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { requestOTPApi, confirmOTPApi } from "../../utils/routes";
import { useSelector } from "react-redux";
import { createOrderApi } from "../../utils/routes";
import { useDispatch } from "react-redux";
import { clear_cart } from "../../slice/cartSlice";
const getBooksFromCart = (cart) => {
  // Check if the cart is empty
  if (!cart || cart.length === 0) {
      return [];
  }

  // Map through the cart to extract the required fields
  return cart.map(item => {
      const { volumeInfo } = item; // Destructure volumeInfo from the item
      return {
          title: volumeInfo.title,
          author: volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown Author',
          price: volumeInfo.pageCount * 3,
          quantity: item.quantity 
      };
  });
};

export const OtpVerification = ({ selectedAddress, handleNext }) => {
  const dispatch = useDispatch()
  const userEmail = useSelector((state) => state.user.email);
  const cart = useSelector((state) => state.cart.cartArray);
  const Orderedbooks = getBooksFromCart(cart);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setEmail(userEmail);
  }, []);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleRequestOTP = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await axios.post(requestOTPApi, { email });
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const res = await axios.post(confirmOTPApi, { email, otp });
      if (res.status === 200) {
        const response = await axios.post(createOrderApi, {
          email: userEmail,
          books: Orderedbooks,
          addressId: selectedAddress._id,
          paymentMethod: "COD",
        });
        dispatch(clear_cart())
        handleNext(4);
      }
    } catch (err) {
      console.log(err.message)
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        OTP Verification
      </Typography>

      <Stack spacing={2}>
        {!otpSent ? (
          <>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button variant="contained" onClick={handleRequestOTP} fullWidth>
              Request OTP
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button variant="contained" onClick={handleVerifyOTP} fullWidth>
              Verify OTP
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default OtpVerification;
