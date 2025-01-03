import { 
    Box, 
    Typography, 
    Paper, 
    IconButton,
    Chip,
    Stack
  } from '@mui/material';
  import LocationOnIcon from '@mui/icons-material/LocationOn';
  import EditIcon from '@mui/icons-material/Edit';
  import HomeIcon from '@mui/icons-material/Home';
  import BusinessIcon from '@mui/icons-material/Business';

const AddressCard = ({ 
    address, 
    isSelected, 
    onSelect, 
    onEdit 
  }) => {
    // Determine icon based on address type
    const getAddressIcon = (type) => {
      switch(type.toLowerCase()) {
        case 'home': return <HomeIcon />;
        case 'office': return <BusinessIcon />;
        default: return <LocationOnIcon />;
      }
    };
  
    return (
      <Paper 
        elevation={isSelected ? 3 : 1}
        onClick={onSelect}
        sx={{ 
          p: 2, 
          mb: 2, 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: isSelected 
            ? '2px solid primary.main' 
            : '1px solid rgba(0,0,0,0.12)',
          '&:hover': {
            boxShadow: isSelected 
              ? '0 4px 6px rgba(0,0,0,0.1)' 
              : '0 4px 6px rgba(0,0,0,0.05)',
            transform: 'translateY(-2px)'
          }
        }}
      >
        {/* Address Icon */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: isSelected ? 'primary.light' : 'grey.200',
            color: isSelected ? 'primary.main' : 'text.secondary',
            borderRadius: '50%',
            width: 56,
            height: 56,
            flexShrink: 0
          }}
        >
          {getAddressIcon(address.type)}
        </Box>
  
        {/* Address Details */}
        <Box sx={{ flexGrow: 1 }}>
          <Stack spacing={0.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {address.type}
              </Typography>
              {isSelected && (
                <Chip 
                  label="Selected" 
                  color="primary" 
                  size="small" 
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
  
            <Typography variant="body2" color="text.secondary">
              {address.street}, {address.city}
            </Typography>
  
            <Typography variant="body2" color="text.secondary">
              {address.state}, {address.country} - {address.postalCode}
            </Typography>
          </Stack>
        </Box>
  
        {/* Edit Button */}
        <IconButton 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(address);
          }}
          color="primary"
          sx={{ 
            opacity: 0.7,
            '&:hover': { 
              opacity: 1,
              bgcolor: 'primary.light'
            }
          }}
        >
          <EditIcon />
        </IconButton>
      </Paper>
    );
  };

  export default AddressCard