import { useEffect, useState } from "react";

function getWeatherText(code) {
  if (code === 0) return "Clear sky";
  if (code === 1 || code === 2 || code === 3) return "Partly cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorm";
  return "Mixed conditions";
}

function CounteryInfo({ country, onClose }) {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");

  const countryName = country.names.common;
  const capital = country.capitals[0]?.name;
  const region = country.region || "Unknown region";
  const latitude = country.coordinates.lat;
  const longitude = country.coordinates.lng;

  useEffect(() => {
    setWeather(null);
    setWeatherError("");

    if (latitude === undefined || longitude === undefined) {
      setWeatherError("Weather is not available for this place.");
      return;
    }

    const weatherUrl =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&current=temperature_2m,weather_code";

    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const temperature = data.current.temperature_2m;
        const unit = data.current_units.temperature_2m;
        const description = getWeatherText(data.current.weather_code);

        setWeather(description + ", " + temperature + " " + unit);
      })
      .catch(function () {
        setWeatherError("Could not load the weather right now.");
      });
  }, [latitude, longitude]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-10">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="w-full aspect-video bg-slate-100 overflow-hidden rounded-xl border border-slate-200 flex items-center justify-center">
          <img
            src={country.flag?.url_png || ""}
            alt={country.flag?.description || `Flag of ${countryName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mt-4">
          {countryName}
        </h3>
        <p className="text-slate-600 mt-2">
          <span className="font-medium text-slate-800">Capital:</span> {capital}
        </p>
        <p className="text-slate-600 mt-1">
          <span className="font-medium text-slate-800">Region:</span> {region}
        </p>
        <p className="text-slate-600 mt-1">
          <span className="font-medium text-slate-800">Weather:</span>{" "}
          {weatherError || weather || "Loading weather..."}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CounteryInfo;
