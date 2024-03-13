import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import cloudyImg from './assets/cloudy.jpg';
import rainImg from './assets/rain.jpg';
import sunnyImg from './assets/sunny.jpg';
import snowImg from './assets/snow.webp';
import windyImg from './assets/widy.jpg'
const Description = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [energyData, setEnergyData] = useState([]);
  const [cityName, setCityName] = useState('');
const [countryCode, setCountryCode] = useState('');

const [currentTime, setCurrentTime] = useState('');
const apiKey = import.meta.env.VITE_WEATHER_BIT_API_KEY;

  
  const getWeatherSymbol = (day) => {
    if (day.precip > 0) {
      return '🌧️'; // Rain symbol
    } else if (day.snow > 0) {
      return '❄️'; // Snow symbol
    } else if (day.clouds >= 50) {
      return '☁️'; // Cloudy symbol
    } else if (day.wind_spd >= 10) {
      return '🌬️'; // Windy symbol
    } else {
      return '☀️'; // Default to sunny symbol
    }
  };

  const getBackgroundImage = () => {
    const presentDate = new Date().toISOString().split('T')[0];
    const presentDayData = energyData.find(day => day.date === presentDate);
  
    if (presentDayData) {
      if (presentDayData.precip > 0) {
        return rainImg;
      } else if (presentDayData.snow > 0) {
        return snowImg;
      } else if (presentDayData.clouds >= 50) {
        return cloudyImg;
      } else if (presentDayData.wind_spd >= 10) {
        return windyImg;
      } else {
        return sunnyImg;
      }
    } else {
      // Default image if present day data is not available
      return sunnyImg;
    }
  };


  
  const divStyle = {
    backgroundImage: `url(${getBackgroundImage()})`,
    width: '100%',
    height: '78vh',
    padding: '20px',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  const getEndDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  };

  const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 6);
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  };



  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchLocation = searchParams.get('location');
    const startDate = getCurrentDate();
    const endDate = getEndDate();

    console.log(startDate, endDate);
 


    fetch(`https://api.weatherbit.io/v2.0/history/energy?city=${searchLocation}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}&tp=daily`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Data:', data);
        setEnergyData(data.data);
       
        setCityName(data.city_name);
        setCountryCode(data.country_code);
      })
      .catch(error => {
        console.error('Error fetching historical energy data:', error);
         navigate('/');
      });
  }, [location, apiKey, navigate]);

  useEffect(() => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const amOrPm = hours >= 12 ? 'p.m.' : 'a.m.';
    const formattedHours = hours % 12 || 12;
    setCurrentTime(`${formattedHours}:${minutes} ${amOrPm}`);
  }, []);
  return (
    <Grid height={100} container spacing={0}>
      <div className="your-class-name" style={divStyle}>
      <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="baseline"
          spacing={2}
        >
          <Typography variant='h2'>{cityName}, {countryCode}</Typography>
          <Typography variant="h4">Current Time: {currentTime}</Typography>
        </Stack>
      </div>
  
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 w-full">
    {energyData.map((day, index) => (
      <div key={day.date} className={`${index === 6 ? 'col-span-2' : ''}`}>
        <div className="border-l p-5 text-center">
          {index === 6 ? (
            <div className='space-y-5'>
              <h3 className="text-4xl font-bold mb-3">{day.temp}°C, {getWeatherSymbol(day)}</h3>
              <p>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long' })}, {new Date(day.date).toLocaleDateString(undefined, { day: 'numeric' })}th</p>
              <p>{day.wind_spd} mph/{day.rh}th</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-6">
              <p>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long' })}</p>
              <p className='text-2xl'>{day.weather_description} {getWeatherSymbol(day)}</p>
              <p className="text-lg">{day.temp}°C</p>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
    </Grid>
  );}
export default Description;
