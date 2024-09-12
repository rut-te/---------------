import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Exeption from "./Exeption";

export default function CityWeather({ city }) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [exeption, setExeption] = useState(false);
    const API_KEY = '8ee633956bad6ae1965b557a94ecfcba';

    useEffect(() => {
        setIsLoading(true);
        getCityDetails();
        setIsLoading(false);
    }, []);

    async function getCityDetails() {
        try {
            await getCityGeocoding();
            if (city.lat && city.lon) {
                await getCityTemp();
            }
            else{
                throw new Error('lat and lon not found')
            }
        }
        catch (e) {
            console.log(e);
            setExeption(true);
            setTimeout(() => {
                setExeption(false);
            }, 5000);
        }
    }
    async function getCityGeocoding() {
        try {
            //???
            const response = await fetch(`ttp://api.openweathermap.org/geo/1.0/direct?q=${city.name},${statecode},${countrycode}&limit=5&appid=${API_KEY}`);
            const resData = await response.json();
            if (response.ok) {
                city.lat = resData[0].lat;
                city.lon = resData[0].lon;
            }
            else {
                throw new Error(response.status)
            }
        }
        catch (e) {
            console.log(e);
            setExeption(true);
            setTimeout(() => {
                setExeption(false);
            }, 5000);
        }
    }

    async function getCityTemp() {
        try {
            const response = await fetch(`ttps://api.openweathermap.org/data/2.5/weather?lat=${city.lat}.34&lon=${city.lon}&
            appid=${API_KEY}&units=metric&&lang=he`);
            const resData = await response.json();
            if (response.ok) {
                city.temp = resData.main.temp;
                city.hebrew_name = resData.name;
                city.description = resData.weather[0].description;
                city.feels_like = resData.main.feels_like;
                city.humidity = resData.main.humidity;
                city.icon = resData.weather[0].icon;
            }
            else {
                throw new Error(response.status)
            }
        }
        catch (e) {
            console.log(e);
            setExeption(true);
            setTimeout(() => {
                setExeption(false);
            }, 5000);
        }
    }


    return (
        <>
            {isLoading && <h1>Loading...</h1>}
            {exeption && <Exeption />}
            <div className="messege">
                <h3>{city.hebrew_name}</h3>
                <h3>{city.description}</h3>
                <h3>{city.icon}</h3>
                <h3>{city.temp}°C</h3>
                <h3>{city.feels_like}°C</h3>
                <h3>{city.humidity}%</h3>
                <button title="Click me" onClick={() => navigate(`${city.name}`)}>להתרשמות מ{city.hebrew_name}</button>
            </div>
        </>
    )
}