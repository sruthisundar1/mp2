// Help with importing/exporting components: https://react.dev/learn/importing-and-exporting-components 
//creating interfaces for response data, modeling off https://www.npmjs.com/package/axios 

import type { Meal } from "../api/response";

interface ListViewProps {
  meals: Meal[];
}

//list rendering structure from https://react.dev/learn/rendering-lists 

export default function ListView(props: ListViewProps) {
  const meals = props.meals;
  const listItems = meals.map(meal =>
    <li key={meal.idMeal}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p>
        <b>{meal.strMeal}:</b>
        {' ' + meal.strCategory}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Meals</h1>
      <ul>{listItems}</ul>
    </article>
  );
}