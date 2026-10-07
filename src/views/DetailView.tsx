// Help with importing/exporting components: https://react.dev/learn/importing-and-exporting-components 
// useParams from https://reactrouter.com/api/hooks/useParams 
// interface help from https://react.dev/learn/typescript 
// conditional rendering help from https://react.dev/learn/conditional-rendering 
// Routing syntax at https://reactrouter.com/start/declarative/routing 
// ingredient list rendering from https://react.dev/learn/rendering-lists 
// prev/next arrows and wrap-around help with https://www.w3schools.com/howto/howto_js_slideshow.asp
import { useParams, Link } from "react-router";
import type { Meal } from "../api/response";
import { getIngredients, countIngredients } from "../api/meals";
import styles from './DetailView.module.css';

interface DetailViewProps {
  meals: Meal[];
}

export default function DetailView(props: DetailViewProps) {
  let params = useParams();

  let curr = -1;
  let count = 0;
  while (count < props.meals.length) {
    if (props.meals[count].idMeal === params.id) {
      curr = count;
      break;
    }
    count += 1;
  }

  if (curr === -1) {
    return null;
  }

  const meal = props.meals[curr];

  let previous = curr - 1;
  if (previous < 0) {
    previous = props.meals.length - 1;
  }

  let next = curr + 1;
  if (next >= props.meals.length) {
    next = 0;
  }

  const previousMeal = props.meals[previous];
  const nextMeal = props.meals[next];

  const ingredients = getIngredients(meal).map(ingredient =>
    <li key={ingredient.name}>{ingredient.measure} {ingredient.name}</li>
  );

  return (
    <div className={styles.navigator}>
      <Link to={`/meal/${previousMeal.idMeal}`} className={styles.arrow}>&#10094;</Link>
      <article className={styles.detail}>
        <div className={styles.top}>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div className={styles.info}>
            <h2>{meal.strMeal}</h2>
            <p>Category: {meal.strCategory}</p>
            <p>Area: {meal.strArea}</p>
            <p>Ingredients: {countIngredients(meal)}</p>
            <ul className={styles.ingredients}>{ingredients}</ul>
          </div>
        </div>
        <p className={styles.recipe}>{meal.strInstructions}</p>
      </article>
      <Link to={`/meal/${nextMeal.idMeal}`} className={styles.arrow}>&#10095;</Link>
    </div>
  );
}