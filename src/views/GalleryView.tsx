// Help with importing/exporting components: https://react.dev/learn/importing-and-exporting-components 
// gallery layout inspired from https://www.w3schools.com/css/css_image_gallery.asp 
// list rendering from https://react.dev/learn/rendering-lists 
// /preview from https://www.themealdb.com/api.php
// checkboxes from https://www.w3schools.com/react/react_forms_checkbox.asp 

import { Link } from "react-router";
import type { Meal } from "../api/response";
import { useState } from "react";
import styles from './GalleryView.module.css';

interface GalleryViewProps {
  meals: Meal[];
}

export default function GalleryView(props: GalleryViewProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categSet = new Set<string>(); //array of categories logic, set ensures no duplicates 
  let count = 0;
  while (count < props.meals.length) {
    categSet.add(props.meals[count].strCategory);
    count += 1;
  }
  const categories = Array.from(categSet).sort();

  const filteredMeals = props.meals.filter(meal => {
    if (selectedCategories.length === 0) { // show everything if no categories checked 
      return true;
    }
    return selectedCategories.includes(meal.strCategory);
  });

  //claude assistance
  const toggle = (category: string) => {
    const updated = new Set(selectedCategories);
    if (updated.has(category)) {
      updated.delete(category);
    } else {
      updated.add(category);
    }
    setSelectedCategories(Array.from(updated));
  };

  // adapted from w3 checkboxes reference 
  const checkboxes = categories.map(category =>
    <label key={category}>
      <input
        type="checkbox"
        checked={selectedCategories.includes(category)} 
        onChange={() => toggle(category)} />
      {category}
    </label>
  );

  const galleryItems = filteredMeals.map(meal =>
    <div key={meal.idMeal} className={styles.galleryItem}>
      <Link to={`/meal/${meal.idMeal}`}>
        <img src={meal.strMealThumb + "/preview"} alt={meal.strMeal} />
      </Link>
      <div className={styles.desc}>{meal.strMeal}</div>
    </div>
  );

  return (
    <article>
      <div className={styles.filters}>{checkboxes}</div>
      <div className={styles.gallery}>{galleryItems}</div>
    </article>
  );
}

