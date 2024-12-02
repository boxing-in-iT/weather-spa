import React from "react";
import "./index.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleCities } from "../../store/features/citiesSlice";
import CityCard from "../../components/CityCard";
import { City } from "../../types/global";
import { Link } from "react-router-dom";

const HomePage = () => {
  const cities = useAppSelector((state) => state.cities.cities);
  const dispatch = useAppDispatch();

  const handleRemoveCity = (city: City) => {
    dispatch(toggleCities(city));
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {cities.map((city) => (
          <Link to={`/detail/${city.name}`}>
            <CityCard key={city.name} city={city} onRemove={handleRemoveCity} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
