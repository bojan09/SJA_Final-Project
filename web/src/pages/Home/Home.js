import "./Home.css";

// hooks
import { useRecipesContext } from "../../hooks/useRecipesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";

// components
import RecipePosts from "../../components/Recipes/RecipePosts/RecipePosts";

const Home = () => {
  const { recipes, dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/v1/recipes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_RECIPES", payload: json });
      }
    };
    if (user) {
      fetchRecipes();
    }
  }, [dispatch, user]);

  return (
    <div className="home-container">
      <h1 className="home-fresh_recipes-heading heading-primary">
        Fresh & New
      </h1>
      <div className="posts-container">
        {recipes &&
          recipes
            .filter((recipe) => recipe.starsCount <= 10)
            .sort((a, b) => a.starsCount - b.starsCount)
            .map(
              (recipe, index) =>
                index < 3 && <RecipePosts key={recipe._id} recipe={recipe} />
            )}
      </div>

      <h1 className="home-popular_recipes-heading heading-primary">
        Most popular recipes
      </h1>
      <div className="posts-container">
        {recipes &&
          recipes
            .filter((recipe) => recipe.starsCount > 10)
            .sort((a, b) => b.starsCount - a.starsCount)
            .map(
              (recipe, index) =>
                index < 6 && <RecipePosts key={recipe._id} recipe={recipe} />
            )}
      </div>
    </div>
  );
};

export default Home;
