import "./BrunchRecipes.css";

// hooks
import { useRecipesContext } from "../../../hooks/useRecipesContext";

// components
import { useEffect } from "react";
import RecipePosts from "../../../components/Recipes/RecipePosts/RecipePosts";

const BrunchRecipes = () => {
  const { recipes, dispatch } = useRecipesContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/v1/recipes/brunch");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_RECIPES", payload: json });
      }
    };

    fetchRecipes();
  }, [dispatch]);

  return (
    <div className="brunch-recipes">
      <h1 className="brunch-recipes_heading heading-primary">Brunch</h1>
      <div className="brunch-main_section posts-container">
        {recipes &&
          recipes
            .sort((a, b) => b.starsCount - a.starsCount)
            .map((recipe) => <RecipePosts key={recipe._id} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default BrunchRecipes;
