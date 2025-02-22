import React, { useEffect, useRef, useState } from 'react';
import '../index.css';
import broken_clouds from '../assets/broken_clouds.png';
import clear_sky from '../assets/clear_sky.png';
import few_clouds from '../assets/few_clouds.png';
import humidity_icon from '../assets/humidity.png';
import mist from '../assets/mist.png';
import rain from '../assets/rain.png';
import scattered_clouds from '../assets/scattered_clouds.png';
import search_icon from '../assets/search.png';
import shower_rain from '../assets/shower_rain.png';
import snow from '../assets/snow.png';
import thunderstorm from '../assets/thunderstorm.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    '01d': clear_sky,
    '01n': clear_sky,
    '02d': few_clouds,
    '02n': few_clouds,
    '03d': scattered_clouds,
    '03n': scattered_clouds,
    '04d': broken_clouds,
    '04n': broken_clouds,
    '09d': shower_rain,
    '09n': shower_rain,
    '10d': rain,
    '10n': rain,
    '11d': thunderstorm,
    '11n': thunderstorm,
    '13d': snow,
    '13n': snow,
    '50d': mist,
    '50n': mist,
  };

  const search = async () => {
    const city = inputRef.current.value.trim();
    if (!city) {
      alert('Enter City Name');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_sky;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(null);
      console.error('Error in fetching weather data', error);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-950 relative font-poppins px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <img
          src="https://img.icons8.com/ios-filled/100/ffffff/partly-cloudy-day.png"
          alt="Weather Logo"
          className="w-12 h-12 sm:w-16 sm:h-16"
        />
        <h1 className="text-white text-xl sm:text-2xl font-bold">SkyCast</h1>
      </div>

      <div className="app p-6 rounded-lg bg-gradient-to-r from-blue-800 to-purple-700 flex flex-col items-center shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <div className="flex items-center gap-2 w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="h-10 border-none outline-none rounded-full pl-4 text-gray-600 bg-teal-100 text-sm font-poppins w-full"
          />
          <img
            src={search_icon}
            alt="Search"
            className="w-10 p-2 rounded-full bg-teal-100 cursor-pointer"
            onClick={search}
          />
        </div>
        {weatherData ? (
          <>
            <img src={weatherData.icon} alt="Weather Icon" className="w-24 sm:w-28 my-4" />
            <p className="text-white text-4xl sm:text-5xl">{weatherData.temperature}°c</p>
            <p className="text-white text-xl sm:text-2xl">{weatherData.location}</p>
            <div className="w-full mt-6 text-white grid grid-cols-2 gap-4 text-sm sm:text-base">
              <div className="flex flex-col items-center">
                <img src={humidity_icon} alt="Humidity" className="w-6 mb-1 sm:w-8" />
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
              <div className="flex flex-col items-center">
                <img src={wind_icon} alt="Wind Speed" className="w-6 mb-1 sm:w-8" />
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;
