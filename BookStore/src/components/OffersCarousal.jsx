import React from 'react';
import Slider from 'react-slick';
import { styled } from '@mui/system';  // MUI v5 styled API

// Styled Components
const SliderContainer = styled('div')({
  position: 'relative',
  width: '100%',
  maxWidth: '1100px',
  margin: 'auto',
});

const SlideContent = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '30px',
  backgroundColor: '#f5f5f5',
  fontSize: '18px',
  textAlign: 'center',
  color: '#333',
});

const OffersCarousal = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 15000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: true,  // Pause carousel on hover
    arrows: false,  // Disable arrows
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        <SlideContent>
          <p>Grab Bestselling books upto 50% off!</p>
        </SlideContent>
        <SlideContent>
          <p>Flat 10% Off- use code BWSSPECIAL</p>
        </SlideContent>
        <SlideContent>
          <p>Get best and fresh books every week</p>
        </SlideContent>
      </Slider>
    </SliderContainer>
  );
};

export default OffersCarousal;
