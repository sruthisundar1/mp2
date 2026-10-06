// Help with importing/exporting components: https://react.dev/learn/importing-and-exporting-components 
// creating interfaces for response data, modeling off https://www.npmjs.com/package/axios 
// search bar modeled off of https://react.dev/learn/thinking-in-react 
import type { Meal } from "../api/response";
import { Link } from "react-router";
import { useState } from 'react';

interface ListViewProps {
  meals: Meal[];
}

//list rendering structure from https://react.dev/learn/rendering-lists 

export default function ListView(props: ListViewProps) {
  const meals = props.meals;
  const [searchText, setSearchText] = useState("");
  
  const matchingMeals = meals.filter(meal => {
    const name = meal.strMeal.toLowerCase();
    return name.startsWith(searchText.toLowerCase());
  });

  let noResult = "";
  if (meals.length > 0 && matchingMeals.length === 0) {
    noResult = "There are no meals matching this search.";
  }


  const listItems = matchingMeals.map(meal =>
    <li key={meal.idMeal}>
        <Link to={`/meal/${meal.idMeal}`}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>
                <b>{meal.strMeal}:</b>
                {' ' + meal.strCategory}
            </p>
        </Link>
    </li>
  );
  return (
    <article>
      <h1>Meals</h1>
      <input
        type="text"
        value={searchText}
        placeholder="Search meals"
        onChange={(e) => setSearchText(e.target.value)} />
      <p>{noResult}</p>
      <ul>{listItems}</ul>
    </article>
  );
}