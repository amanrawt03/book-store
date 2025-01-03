import React, { useEffect, useState } from 'react';
import orderLoading from '../../assets/orderLoading.gif';
import OrderConfirmation from './OTPConfirmation';

export const OrderPlacement = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer to hide the loading GIF after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {isLoading ? (
        <img src={orderLoading} alt="Loading..." />
      ) : (
        <OrderConfirmation/>
      )}
    </div>
  );
};

export default OrderPlacement

