import { createContext, useReducer } from "react";

export const RecipesContext = createContext();
// state,
export const recipesReducer = (recipes = [], action) => {
  switch (action.type) {
    case "FETCH_RECIPES":
      return {
        recipes: action.payload,
      };

    case "CREATE_RECIPE":
      return {
        recipes: [action.payload, ...recipes.recipes],
      };

    case "UPDATE_RECIPE":
      return recipes.map((recipe) =>
        recipe._id === action.payload._id ? action.payload : recipe
      );

    case "STAR_RECIPE":
      return recipes.map((recipe) =>
        recipe._id === action.payload._id ? action.payload : recipe
      );

    case "DELETE_RECIPE":
      return {
        recipes: recipes.recipes.filter((r) => r._id !== action.payload._id),
      };

    default:
      return recipes;
  }
};

export const RecipesContextProvider = ({ children }) => {
  const [recipes, dispatch] = useReducer(recipesReducer, {
    recipes: null,
  });

  return (
    <RecipesContext.Provider value={{ ...recipes, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};
