import React from "react";
import HomePage from "./pages/home";
import "./pages/home/index.scss";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CityDetailPage from "./pages/city-detail/CityDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:name" element={<CityDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
