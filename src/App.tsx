import { Routes, Route, Link } from "react-router";
import './App.css'
import ListView from './views/ListView'
import GalleryView from './views/GalleryView'
import DetailView from './views/DetailView'
import { useState, useEffect } from "react";
import { getAllMeals } from "./api/meals";
import type { Meal } from "./api/response";

// Sources
// https://v5.reactrouter.com/web/guides/quick-start
// Routing syntax at https://reactrouter.com/start/framework/routing 

function App() {

  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState("");

  //some claude help for useEffect
  useEffect(() => {
  getAllMeals()
    .then((result) => {
      setMeals(result);
    })
    .catch((err) => {
      setError(err.message);
    });
  }, []);

  return (
    <div>
      <Link to="/">List</Link>
      <Link to="/gallery">Gallery</Link>

      <p>{error}</p>

      <Routes>
        <Route path="/" element={<ListView meals={meals} />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/meal/:id" element={<DetailView />} />
      </Routes>
    </div>
  )
}

export default App
