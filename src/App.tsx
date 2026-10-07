import { Routes, Route, NavLink } from "react-router";
import './App.module.css'
import ListView from './views/ListView'
import GalleryView from './views/GalleryView'
import DetailView from './views/DetailView'
import { useState, useEffect } from "react";
import { getAllMeals } from "./api/meals";
import type { Meal } from "./api/response";
import styles from './App.module.css'

// Sources
// https://v5.reactrouter.com/web/guides/quick-start
// Routing syntax at https://reactrouter.com/start/framework/routing 
// Navlink from https://reactrouter.com/api/components/NavLink 
// useState help from https://react.dev/learn/typescript 

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
      <header className={styles.header}>
        <h1>Meal Explorer</h1>
        <div className={styles["pill-nav"]}>
          <NavLink to="/" end>List</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
        </div>
      </header>

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
