import { createSlice } from "@reduxjs/toolkit";
import { City } from "../../types/global";

interface CitiesState {
  cities: City[];
  citiy: City;
}

const initialState: CitiesState = {
  cities: localStorage.getItem("cities")
    ? JSON.parse(localStorage.getItem("cities")!)
    : [],
  citiy: {} as City,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState: initialState,
  reducers: {
    toggleCities: (state, action) => {
      const isExist = state.cities.some(
        (city) => city.name === action.payload.name
      );

      if (isExist) {
        state.cities = state.cities.filter(
          (city) => city.name !== action.payload.name
        );
      } else {
        state.cities.push(action.payload);
      }

      // Обновляем localStorage
      localStorage.setItem("cities", JSON.stringify(state.cities));
    },
  },
});

export const { toggleCities } = citiesSlice.actions;
export default citiesSlice.reducer;
