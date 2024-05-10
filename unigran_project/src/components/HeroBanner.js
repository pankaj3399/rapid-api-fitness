import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import HeroBannerImage from '../imagens/images/heroBanner.jpg';

const HeroBanner = () => (
    <Box sx={{ mt: { lg: '212px', xs: '70px' } }} position="relative" p="20px">
        <Typography color='white' fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px' } }} mb="23px" justifyContent='right' display='grid' pr='30px' >
            Sweat, Smile <br />
            And Repeat
            <Typography color='white' fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
                Check out the most effective exercises personalized to you
            </Typography>
        </Typography>

        <Stack>
            <a href="#exercises" style={{ marginTop: '45px', textDecoration: 'none', width: '200px', textAlign: 'center', padding: '14px', fontSize: '22px', textTransform: 'none', color: 'white', borderRadius: '4px' }} className='explore-btn'>Explore Exercises</a>
        </Stack>
        <Typography fontWeight={600} color="#bc13fe" sx={{ opacity: '0.1', display: { lg: 'block', xs: 'none' }, fontSize: '200px' }}>
            Exercícios
        </Typography>
        <img src={HeroBannerImage} alt="hero-banner" className="hero-banner-img" />
    </Box>
);

export default HeroBanner;