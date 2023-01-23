import "../CreateRecipes/CreateRecipes.css";

import { Link } from "react-router-dom";
import { useEffect } from "react";

// go back to my recipes img
import goBackMyRecipes from "../../Archive/icon_back_white.svg";

// hooks
import { useRecipesContext } from "../../hooks/useRecipesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import RecipesUpdateForm from "../../components/Recipes/RecipeUpdateForm/RecipeUpdateForm";

const UpdateRecipes = () => {
  const { recipes, dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/v1/recipes/me/", {
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
    <div>
      <div className="create-recipes">
        <div className="my-recipes_container">
          <h1 className="my-recipes_main-heading heading-primary">
            My Recipes
          </h1>

          <Link to="/my-recipes">
            <button className="my-recipes_add-recipe">
              <img
                src={goBackMyRecipes}
                alt="go back to Myrecipes"
                className="add-recipes_img"
              />
            </button>
          </Link>
        </div>

        {recipes &&
          recipes
            .filter((_, index) => index <= 0)
            .map((recipe) => (
              <RecipesUpdateForm key={recipe._id} recipe={recipe} />
            ))}
      </div>
    </div>
  );
};

export default UpdateRecipes;
