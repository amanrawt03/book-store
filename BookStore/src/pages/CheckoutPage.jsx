import React from 'react'
import { Container, Box } from '@mui/material'
import CheckoutProcess from '../components/CheckoutProcess'
import Navbar from '../components/Navbar'

const CheckoutPage = () => {
  return (
    <>
      <Navbar/>
      <Container maxWidth="lg">
        <Box 
          sx={{
            marginTop: {
              lg: 10,   // Large margin on large screens
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CheckoutProcess/>
        </Box>
      </Container>
    </>
  )
}

export default CheckoutPage