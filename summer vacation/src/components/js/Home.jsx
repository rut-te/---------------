//import '../../css/Home.css'
import {cities} from '../../data/cities_array';
import CityWeather from './CityWeather';

export default function Home() {

  return (
    <>
      <main>
        {cities.map((city, i) => {
          return <CityWeather city={city} key={i} />
        }
        )}
      </main>
    </>
  )
}
