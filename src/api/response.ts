//creating interfaces for response data, modeling off https://www.npmjs.com/package/axios 
//fields from https://www.themealdb.com/api.php, specifically from running a sample query
export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface MealsResponse {
  meals: Meal[] | null;
}

export interface Ingredient {
  name: string;
  measure: string | null;
}