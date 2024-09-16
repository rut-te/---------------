import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Exeption from "./Exeption";
import '../css/CityWeather.css';

export default function CityWeather({ city }) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [exeption, setExeption] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [dislikeCount, setDislikeCount] = useState();
    const API_KEY = '5097fe0683f208a2a81e9594176d7387';

    useEffect(() => {
        setIsLoading(true);
        getCityDetails();

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

    useEffect(() => {
        const intervalId = setInterval(handleRender, 3 * 60 * 60 * 1000);
        return () => {
            clearInterval(intervalId);
        }
    });

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    const handleBeforeUnload = () => {
        if (JSON.parse(localStorage.getItem(`${city.name}_details`)))
            localStorage.removeItem(`${city.name}_details`);
    };

    function handleRender() {
        if (JSON.parse(localStorage.getItem(`${city.name}_details`)))
            localStorage.removeItem(`${city.name}_details`);
        console.log('re');
        setIsLoading(true);
        getCityDetails();
    };

    async function getCityDetails() {
        try {
            const city_details = JSON.parse(localStorage.getItem(`${city.name}_details`));
            if (city_details) {
                city.temp = city_details.temp;
                city.hebrew_name = city_details.hebrew_name;
                city.description = city_details.description;
                city.feels_like = city_details.feels_like;
                city.humidity = city_details.humidity;
                city.icon = city_details.icon;
                setIsLoading(false);
                console.log('ls');
            }
            else {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&APPID=${API_KEY}&units=metric&&lang=he`);
                const resData = await response.json();
                console.log(resData);
                if (response.ok) {
                    city.temp = resData.main.temp;
                    city.hebrew_name = resData.name;
                    city.description = resData.weather[0].description;
                    city.feels_like = resData.main.feels_like;
                    city.humidity = resData.main.humidity;
                    city.icon = city.feels_like <= 20 ? '⛈️' : city.feels_like >= 30 ? '☀️' : '⛅';
                    localStorage.setItem(`${city.name}_details`, JSON.stringify(city));
                    setIsLoading(false);
                    console.log('b');
                }
                else {
                    throw new Error(response.status)
                }
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
            {!isLoading &&
                <div className="information">
                    <div className='firstLine'>
                        <h2 className='icon'>{city.icon}</h2>
                        <h2 className='name'>{city.hebrew_name}</h2>
                    </div>
                    <h3 className='descreption'>{city.description}</h3>
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
                    <button className='button' title="Click me" onClick={() => { navigate(`${city.name}`) }}>להתרשמות מ{city.hebrew_name}</button>
                </div>}
        </>
    )
}