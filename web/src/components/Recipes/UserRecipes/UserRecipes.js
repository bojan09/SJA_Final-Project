import "./UserRecipes.css";

import { Link } from "react-router-dom";

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

  const handleDelete = async () => {
    if (!user) {
      return console.log("No user is logged in");
    }

    const response = await fetch("/api/v1/recipes/" + recipe._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_RECIPE", payload: recipe._id });
    }
  };

  return (
    <div className="user-recipe_preview-container">
      <Link
        className="user-recipe_update-recipe_link"
        to={"/update-recipe/" + recipe._id}
      >
        <h3 className="user-recipe_title">{recipe.title}</h3>
      </Link>
      <h3 className="user-recipe_category">{recipe.category}</h3>
      <h3 className="user-recipe_createdOn">
        {dateFormat(recipe.createdOn, "d.mm.yyyy")}
      </h3>
      <button className="user-recipes_delete-btn" onClick={handleDelete}>
        <img src={deleteBtn} alt="delete recipe" />
      </button>
    </div>
  );
};

export default UserRecipes;
