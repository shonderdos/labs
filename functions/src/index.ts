const { onSchedule } = require('firebase-functions/v2/scheduler');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { defineSecret } = require('firebase-functions/params');

initializeApp();
const API_KEY = defineSecret('OpenWeatherAPI');
const db = getFirestore();
export const pollWeather = onSchedule({ secrets: [API_KEY], schedule: 'every 2 hours' }, async () => {
  const lat = '52.632359';
  const lon = '4.750680';
  const units = 'metric';
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY.value()}&units=${units}`
  );
  const data = await res.json();
  return db
    .collection('weather')
    .doc('Q63gOemxmvWCQ2mQ0lnd')
    .set({
      last_update: Date.now(),
      wind_speed: {
        title: 'Wind speed',
        icon: 'air',
        current_value: data.current.wind_speed,
        previous_value: 13,
        unit: 'km/h',
      },
      temperature: {
        title: 'Temperature',
        icon: 'device_thermostat',
        current_value: data.current.temp,
        previous_value: 23.5,
        unit: '°C',
      },
      chance_of_rain: {
        title: 'Rain',
        icon: 'water_drop',
        current_value: data.current.rain?.['1h'] || data.current.rain?.['3h'] || 0,
        previous_value: 35,
        unit: 'mm/h',
      },
      uv_index: {
        title: 'Uv index',
        icon: 'flare',
        current_value: 1,
        previous_value: data.current.uvi,
        unit: 'mW/m²',
      },
      sunset: {
        title: 'Sunset',
        icon: 'wb_twilight',
        current_value: 2113,
        previous_value: 2114,
        unit: 'min.',
      },
    });
});
