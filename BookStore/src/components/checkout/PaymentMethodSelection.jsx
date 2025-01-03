import React from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio 
} from '@mui/material';

export const PaymentMethodSelection = ({ 
  paymentMethod, 
  onPaymentMethodChange 
}) => {
  return (
    <Box>
      <Typography variant="h6">Select Payment Method</Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(e.target.value)}
        >
          <FormControlLabel 
            value="cod" 
            control={<Radio />} 
            label="Cash on Delivery" 
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
