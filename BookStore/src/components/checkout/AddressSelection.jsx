import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { EmptyAddressState } from './EmptyAddressState';
import { AddUserAddressApi } from '../../utils/routes';
import { AddressDialog } from './AddressDialog';
import axios from 'axios';
import AddressCard from './AddressCard';
export const AddressSelection = ({ 
  addresses = [], 
  selectedAddress, 
  onAddressSelect, 
  onEditAddress 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSubmit = async (formData) => {
    const {username, type, street, city, state, postalCode, country} = formData;
    try {
      // Assuming AddUserAddressApi is an async function
      const response = await axios.post(AddUserAddressApi, {username, type, street, city, state, postalCode, country})
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}
      >
        Select Delivery Address
        <Button 
          variant="outlined" 
          color="primary"
          onClick={handleOpenDialog}
          startIcon={<LocationOnIcon />}
        >
          Add New Address
        </Button>
      </Typography>

      {addresses.length === 0 ? (
        <EmptyAddressState onAddNewAddress={handleOpenDialog} />
      ) : (
        addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            isSelected={selectedAddress?._id === address._id}
            onSelect={() => onAddressSelect(address)}
            onEdit={onEditAddress}
          />
        ))
      )}

      <AddressDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default AddressSelection;