import React from "react";
import "./index.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleCities } from "../../store/features/citiesSlice";
import CityCard from "../../components/CityCard";
import { City } from "../../types/global";

const HomePage = () => {
  const cities = useAppSelector((state) => state.cities.cities);
  const dispatch = useAppDispatch();

  const handleRemoveCity = (city: City) => {
    dispatch(toggleCities(city));
  };

  console.log("cities", cities);

  return (
    <div className="home-container">
      <div className="home-content">
        {cities.length > 0 ? (
          cities.map((city) => (
            <CityCard key={city.name} city={city} onRemove={handleRemoveCity} />
          ))
        ) : (
          <p className="no-cities-message">Find your city</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
