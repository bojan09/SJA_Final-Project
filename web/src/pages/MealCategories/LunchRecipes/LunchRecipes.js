import "./LunchRecipes.css";

// hooks
import { useRecipesContext } from "../../../hooks/useRecipesContext";
import { useEffect } from "react";

// components
import RecipePosts from "../../../components/Recipes/RecipePosts/RecipePosts";

const LunchRecipes = () => {
  const { recipes, dispatch } = useRecipesContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/v1/recipes/lunch");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_RECIPES", payload: json });
      }
    };

    fetchRecipes();
  }, [dispatch]);

  return (
    <div className="lunch-recipes">
      <h1 className="lunch-recipes_heading heading-primary">Lunch</h1>
      <div className="lunch-main_section posts-container">
        {recipes &&
          recipes
            .sort((a, b) => b.starsCount - a.starsCount)
            .map((recipe) => <RecipePosts key={recipe._id} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default LunchRecipes;
