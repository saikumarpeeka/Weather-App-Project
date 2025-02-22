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

  const search = async (city) => {
    if (city === '') {
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
        WindSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error('Error in fetching weather data');
    }
  };

  useEffect(() => {
    search('Ongole');
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-950 relative font-poppins">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <img
          src="https://img.icons8.com/ios-filled/100/ffffff/partly-cloudy-day.png"
          alt="Weather Logo"
          className="w-20 h-15"
        />
         <h1 className="text-white text-3xl font-bold">SkyCast</h1>
      </div>

      <div className="app p-6 rounded-lg bg-gradient-to-r from-blue-800 to-purple-700 flex flex-col items-center shadow-xl">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="h-12 border-none outline-none rounded-full pl-6 text-gray-600 bg-teal-100 text-lg font-poppins"
          />
          <img
            src={search_icon}
            alt="Search"
            className="w-12 p-3 rounded-full bg-teal-100 cursor-pointer"
            onClick={() => search(inputRef.current.value)}
          />
        </div>
        {weatherData ? (
          <>
            <img src={weatherData.icon} alt="Weather Icon" className="w-36 my-8" />
            <p className="text-white text-6xl">{weatherData.temperature}°c</p>
            <p className="text-white text-4xl">{weatherData.location}</p>
            <div className="w-full mt-10 text-white flex justify-between">
              <div className="flex items-start gap-3 text-2xl">
                <img src={humidity_icon} alt="Humidity" className="w-6 mt-2" />
                <div>
                  <p>{weatherData.humidity} %</p>
                  <span className="text-lg">Humidity</span>
                </div>
              </div>
              <div className="flex items-start gap-3 text-2xl">
                <img src={wind_icon} alt="Wind Speed" className="w-6 mt-2" />
                <div>
                  <p>{weatherData.WindSpeed} Km/h</p>
                  <span className="text-lg">Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;
