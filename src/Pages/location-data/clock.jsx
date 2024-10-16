import React, { useState, useEffect } from "react";

function Clock() {
    const [time, setTime] = useState(
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        }, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>Current Time: {time}</h1>
        </div>
    );
}

export default Clock;

// Get Day of the week

export function DayOfWeek() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, []);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <div>
            <p>{date.toLocaleDateString(undefined, options)}</p>
        </div>
    );
}

// Location Name and temp function

export function WeatherComponent() {
    const [locationName, setLocationName] = useState("");
    const [temperature, setTemperature] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = "50af882a674b05e7d91e68cc7363a754"; // Replace with your actual OpenWeather API key

    // Function to fetch weather data
    async function fetchWeatherData(lat, lon) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            if (response.ok) {
                setTemperature(data.main.temp);
                setLocationName(data.name); // Setting the location name (city)
                setLoading(false);
            } else {
                setError(data.message);
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to fetch weather data.");
            setLoading(false);
        }
    }

    // Function to get user's current location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherData(latitude, longitude);
                },
                (err) => {
                    setError("Geolocation permission denied.");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }

    // useEffect to get the location and fetch weather data on component mount
    useEffect(() => {
        getLocation();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>{locationName}</h2>
            <p>{temperature}°C</p>
        </div>
    );
}