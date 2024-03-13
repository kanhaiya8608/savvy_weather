// WeatherSearch.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import img1 from './assets/sunny2.jpg'
import './index.css'
const WeatherSearch = () => {
  
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_WEATHER_BIT_API_KEY;

  const handleSearch = () => {
    const apiUrl = `https://api.weatherbit.io/v2.0/history/energy?city=${location}&key=${apiKey}&tp=daily`;
    navigate(`/description?location=${location}`);
  };
  const divStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundImage: `url(${img1})`,
    width: 'auto',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="your-class-name" style={divStyle}>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      textAlign='center'
      alignItems="center"
      className='fullHeight'
      padding={2}
      margin={1}
      style={{ backgroundImage: "url('./assets/cloudy.jpg')", backgroundSize: 'cover' }}
    >
      <Typography color="darkblue" variant="h2" component="h2" alignItems={'center'}>
        Weather Forecast
      </Typography>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <TextField 
          sx={{ width: { xs: '70vw', md: '40vw' } }}
          
          variant="outlined" color="primary"
          type="text"
          placeholder="Enter a City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button variant="outlined" onClick={handleSearch}>
          Get Weather
        </Button>
      </Stack>
    </Box>
    </div>
  );
};

export default WeatherSearch;
