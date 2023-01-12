import "./MyRecipes.css";
import { Link } from "react-router-dom";

// hooks
import { useEffect } from "react";
import { useRecipesContext } from "../../hooks/useRecipesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import UserRecipes from "../../components/Recipes/UserRecipes/UserRecipes";

// add recipes img
import addRecipesImg from "../../Archive/icon_plus_white.svg";

const MyRecipes = () => {
  const { recipes, dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/v1/recipes/me/", {
        headers: {
          "Content-Type": "application/json",
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
    <div className="my-recipes">
      <div className="my-recipes_container">
        <h1 className="my-recipes_main-heading heading-primary">My Recipes</h1>
        <Link to="/create-recipes">
          <button className="my-recipes_add-recipe">
            <img
              src={addRecipesImg}
              alt="add-recipes"
              className="my-recipes_img"
            />
          </button>
        </Link>
      </div>

      <div className="my-recipes_category-names">
        <h3 className="my-recipes_recipe-name">Recipe Name</h3>
        <h3 className="my-recipes_category">Category</h3>
        <h3 className="my-recipes_createdOn">Created On</h3>
        <h3 className="my-recipes_delete-btn">Delete</h3>
      </div>

      <div className="my-recipes_preview">
        {recipes &&
          recipes.map((recipe) => (
            <UserRecipes key={recipe._id} recipe={recipe} />
          ))}
      </div>
    </div>
  );
};

export default MyRecipes;
