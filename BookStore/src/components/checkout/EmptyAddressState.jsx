import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
  Typography,
  Paper
} from '@mui/material';
export const EmptyAddressState = () => (
    <Paper
      sx={{
        p: 4,
        textAlign: 'center',
        bgcolor: 'grey.50',
        border: '1px dashed grey.300'
      }}
    >
      <LocationOnIcon 
        sx={{ 
          fontSize: 48, 
          color: 'text.secondary',
          mb: 2
        }} 
      />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No addresses added yet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Add your first delivery address to get started
      </Typography>
    </Paper>
  );