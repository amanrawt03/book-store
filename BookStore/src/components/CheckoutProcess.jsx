import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Container,
} from "@mui/material";
import {toast} from 'react-toastify'
import {
  AddressSelection,
  PaymentMethodSelection,
  OrderSummary,
  OtpVerification,
  OrderPlacement,
} from "./checkout/index.jsx";
import { fetchUserAddressApi } from "../utils/routes.js";
import axios from "axios";
import { useSelector } from "react-redux";
const CheckoutProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [addresses, setAddresses] = useState([]);
  const username = useSelector((state) => state.user.username);
  useEffect(() => {
    const fetchAddress = async () => {
      const response = await axios.post(fetchUserAddressApi, { username });
      if(response.status === 200){setAddresses(response.data.existingAddresses);}
    };
    fetchAddress();
  }, [addresses]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
 

  const steps = [
    "Select Address",
    "Payment Method",
    "Confirm Order",
    "OTP Verification",
    "Order Placement",
  ];

  const handleNext = () => {
    if (activeStep === 0 && !selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    if (activeStep === 1 && !paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const handleAddNewAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressSelection
            addresses={addresses}
            selectedAddress={selectedAddress}
            onAddressSelect={setSelectedAddress}
            onAddNewAddress={handleAddNewAddress}
          />
        );
      case 1:
        return (
          <PaymentMethodSelection
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        );
      case 2:
        return (
          <OrderSummary
            selectedAddress={selectedAddress}
            paymentMethod={paymentMethod}
          />
        );
      case 3:
        return (
          <OtpVerification
          selectedAddress = {selectedAddress}
          handleNext = {setActiveStep}
          />
        );
      case 4:
        return <OrderPlacement />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="sm">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2, mb: 2 }}>{getStepContent(activeStep)}</Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {activeStep !== 0 && activeStep !== 4 && (
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
        )}
        {activeStep !== steps.length - 1 && activeStep !== 3 && (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default CheckoutProcess;
