import React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
const AddressForm = ({ onClose, onSubmit }) => {
  const username = useSelector((state) => state.user.username);
  const [formData, setFormData] = useState({
    username: `${username}`,
    type: "home",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "username",
      "type",
      "street",
      "city",
      "state",
      "postalCode",
      "country",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.postalCode && !/^\d{5,6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid postal code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Full Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
        />

        <FormControl fullWidth error={!!errors.type}>
          <InputLabel>Address Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            label="Address Type"
          >
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="office">Office</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Street Address"
          name="street"
          multiline
          rows={2}
          value={formData.street}
          onChange={handleChange}
          error={!!errors.street}
          helperText={errors.street}
        />

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />

          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            error={!!errors.postalCode}
            helperText={errors.postalCode}
          />

          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
          />
        </Box>

        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add Address
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default AddressForm;
