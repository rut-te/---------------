import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Exeption from "./Exeption";
import '../css/CityWeather.css';

export default function CityWeather({ city }) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [exeption, setExeption] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [dislikeCount, setDislikeCount] = useState()
    const API_KEY = '8ee633956bad6ae1965b557a94ecfcba';

    useEffect(() => {
        setIsLoading(true);
        getCityDetails();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const likeAndDislikeArr = JSON.parse(localStorage.getItem(`${city.name}`));
        if (!likeAndDislikeArr) {
            localStorage.setItem(city.name, JSON.stringify({ likes: 0, dislikes: 0 }));
            setLikeCount(0);
            setDislikeCount(0);
        }
        else {
            setLikeCount(likeAndDislikeArr.likes);
            setDislikeCount(likeAndDislikeArr.dislikes);
        }
    }, []);

    async function getCityDetails() {
        try {
            await getCityGeocoding();
            if (city.lat && city.lon) {
                await getCityTemp();
            }
            else {
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

    function addDislikeCount() {
        localStorage.setItem(city.name, JSON.stringify({ likes: likeCount, dislikes: (dislikeCount + 1) }));
        setDislikeCount((dislikeCount) => dislikeCount + 1);
    }

    function addLikeCount() {
        localStorage.setItem(city.name, JSON.stringify({ likes: (likeCount + 1), dislikes: dislikeCount }));
        setLikeCount((likeCount) => likeCount + 1);
    }

    return (
        <>
            {isLoading && <h1>Loading...</h1>}
            {exeption && <Exeption />}
            <div className="information">
                <div className='firstLine'>
                    <h3 className='icon'>🫣{city.icon}</h3>
                    <h2 className='name'>שם{city.hebrew_name}</h2>
                </div>
                <h3 className='descreption'>תיאור{city.description}</h3>
                <div className='tempsDiv'>
                    <div className='tempdiv'>
                        <h4 className='tempText'>לחות</h4>
                        <h3 className='temp'>{city.humidity}%</h3>
                    </div>
                    <div className='tempdiv'>
                        <h4 className='tempText'>טמפ' מורגשת</h4>
                        <h3 className='temp'>{city.feels_like}°C</h3>
                    </div>
                    <div className='tempdiv'>
                        <h4 className='tempText'>טמפ' נמדדת</h4>
                        <h3 className='temp'>{city.temp}°C</h3>
                    </div>
                </div>
                <div className='likeAndDislikeButtons'>
                    <button className='button' onClick={() => addLikeCount()}>
                        👍 {likeCount}
                    </button>
                    <button className='button' onClick={() => addDislikeCount()}>
                        👎 {dislikeCount}
                    </button>
                </div>
                <button className='button' title="Click me" onClick={() => navigate(`${city.name}`)}>להתרשמות מ{city.hebrew_name}</button>
            </div>
        </>
    )
}