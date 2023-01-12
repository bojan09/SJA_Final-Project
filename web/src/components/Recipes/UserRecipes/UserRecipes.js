import "./UserRecipes.css";

import { Link } from "react-router-dom";
import { useState } from "react";

// date formating package from npm
import dateFormat from "dateformat";

// hooks
import { useRecipesContext } from "../../../hooks/useRecipesContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

// icon img
import deleteBtn from "../../../Archive/icon_trashcan.svg";

const UserRecipes = ({ recipe }) => {
  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  const [removeRecipe, setRemoveRecipe] = useState(false);

  console.log(recipe);

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/v1/recipes/" + recipe._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_RECIPE", payload: json });
      setRemoveRecipe(handleDelete);
    }
  };

  return (
    <div className="user-recipe_preview-container">
      <Link to={"/update-recipe/" + recipe._id}>
        <h3 className="user-recipe_title">{recipe.title}</h3>
      </Link>

      <h3 className="user-recipe_category">{recipe.category}</h3>
      <h3 className="user-recipe_createdOn">
        {dateFormat(recipe.createdOn, "d.mm.yyyy")}
      </h3>
      <button className="user-recipes_delete-btn" onClick={(e) => removeRecipe}>
        <img src={deleteBtn} alt="delete recipe" />
      </button>
    </div>
  );
};

export default UserRecipes;
