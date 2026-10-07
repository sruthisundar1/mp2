import axios from "axios";
import type { Ingredient, Meal, MealsResponse } from "./response";

//from https://www.themealdb.com/api.php
const API_URL = "https://www.themealdb.com/api/json/v1/1";

//modeled off MP2 devlab slides 
export const getMealsByLetter = async (letter: string): Promise<Meal[]> => {
  let response = await axios<MealsResponse>({
    method: "GET",
    url: `${API_URL}/search.php`,
    params: {
      f: letter,
    },
  }).catch((err) => {
    console.error("letter", letter);
    throw err;
  });

  if (response.data.meals === null) {
    return [];
  }
  return response.data.meals;
};

//claude suggested getting all meals by looping letter by letter 
export const getAllMeals = async (): Promise<Meal[]> => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let allMeals: Meal[] = [];
  let index = 0;

  while (index < letters.length) {
    const meals = await getMealsByLetter(letters[index]);
    allMeals = allMeals.concat(meals);
    index += 1;
  }

  return allMeals;
};

export function countIngredients(meal: Meal): number { //field to sort by 
  return getIngredients(meal).length;
}

export function getIngredients(meal: Meal): Ingredient[] {
  const all_ingredients = [];
  let count = 1;
  while (count <= 20) {
    const each_ingredient = meal[`strIngredient${count}`];
    const each_measure = meal[`strMeasure${count}`];

    if (each_ingredient) { //not null or empty
      all_ingredients.push({ name: each_ingredient, measure: each_measure });
    }

    count += 1
  }
  return all_ingredients;
}