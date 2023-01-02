import "./DinnerRecipes.css";

// hooks
import { useRecipesContext } from "../../../hooks/useRecipesContext";
import { useEffect } from "react";

// components
import RecipePosts from "../../../components/Recipes/RecipePosts/RecipePosts";

const DinnerRecipes = () => {
  const { recipes, dispatch } = useRecipesContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/v1/recipes/dinner");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_RECIPES", payload: json });
      }
    };

    fetchRecipes();
  }, [dispatch]);

  return (
    <div className="dinner-recipes">
      <h1 className="dinner-recipes_heading heading-primary">Dinner</h1>
      <div className="dinner-main_section posts-container">
        {recipes &&
          recipes
            .sort((a, b) => b.starsCount - a.starsCount)
            .map((recipe) => <RecipePosts key={recipe._id} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default DinnerRecipes;
