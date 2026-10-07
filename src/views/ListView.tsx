// Help with importing/exporting components: https://react.dev/learn/importing-and-exporting-components 
// creating interfaces for response data, modeling off https://www.npmjs.com/package/axios 
// search bar modeled off of https://react.dev/learn/thinking-in-react 
// sorting by type help from https://www.kindacode.com/article/react-how-to-create-a-reorderable-list 
//listview cards inspired from https://www.w3schools.com/howto/howto_css_cards.asp 
// interface help from https://react.dev/learn/typescript 

import type { Meal } from "../api/response";
import { Link } from "react-router";
import { useState } from 'react';
import { countIngredients } from "../api/meals";
import styles from './ListView.module.css';

interface ListViewProps {
  meals: Meal[];
}

//list rendering structure from https://react.dev/learn/rendering-lists 

export default function ListView(props: ListViewProps) {
  const meals = props.meals;
  const [searchText, setSearchText] = useState("");

  const [sortByType, setSortByType] = useState("name");
  const [order, setOrder] = useState("ascending");
  
  const matchingMeals = meals.filter(meal => {
    const name = meal.strMeal.toLowerCase();
    return name.startsWith(searchText.toLowerCase());
  });

  const sortedMeals = [...matchingMeals];

  if (sortByType === "name" && order === "ascending") {
    sortedMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  }
  if (sortByType === "name" && order === "descending") {
    sortedMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }
  if (sortByType === "ingredients" && order === "ascending") {
    sortedMeals.sort((a, b) => countIngredients(a) - countIngredients(b));
  }
  if (sortByType === "ingredients" && order === "descending") {
    sortedMeals.sort((a, b) => countIngredients(b) - countIngredients(a));
  }


  let noResult = "";
  if (meals.length > 0 && matchingMeals.length === 0) {
    noResult = "There are no meals matching this search.";
  }


  const listItems = sortedMeals.map(meal =>
    <li key={meal.idMeal}>
        <Link to={`/meal/${meal.idMeal}`} className={styles.card}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className={styles.container}>
                <h4><b>{meal.strMeal}</b></h4>
                <p>Ingredients: {countIngredients(meal)}</p>
                <p>Category: {meal.strCategory}</p>
            </div>
        </Link>
    </li>
  );
  return (
    <article>
        <div className={styles.searching}>
            <h1>Meals</h1>
            <input
                className={styles.search}
                type="text"
                value={searchText}
                placeholder="Search meals"
                onChange={(e) => setSearchText(e.target.value)} />
            <select onChange={(e) => setSortByType(e.target.value)}>
                <option value="name">Name</option>
                <option value="ingredients">Number of Ingredients</option>
            </select>
            <select onChange={(e) => setOrder(e.target.value)}>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </div>
      <p className={styles.noResult}>{noResult}</p>
      <ul className={styles.mealList}>{listItems}</ul>
    </article>
  );
}