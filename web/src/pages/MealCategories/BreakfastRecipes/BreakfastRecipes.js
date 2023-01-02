import "./BreakfastRecipes.css";

// hooks
import { useEffect } from "react";
import { useRecipesContext } from "../../../hooks/useRecipesContext";

// components
import RecipePosts from "../../../components/Recipes/RecipePosts/RecipePosts";

const BreakfastRecipes = () => {
  const { recipes, dispatch } = useRecipesContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(`/api/v1/recipes/breakfast`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_RECIPES", payload: json });
      }
    };

    fetchRecipes();
  }, [dispatch]);

  return (
    <div className="breakfast-recipes">
      <h1 className="breakfast-recipes_heading heading-primary">Breakfast</h1>
      <div className="breakfast-main_section posts-container">
        {recipes &&
          recipes
            .sort((a, b) => b.starsCount - a.starsCount)
            .map((recipe) => <RecipePosts key={recipe._id} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default BreakfastRecipes;
