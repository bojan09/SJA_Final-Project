import "./CreateRecipes.css";

import { Link } from "react-router-dom";

// go back to my recipes img
import goBackMyRecipes from "../../Archive/icon_back_white.svg";

// components
import RecipesForm from "../../components/Recipes/RecipesForm/RecipesForm";

const CreateRecipes = () => {
  return (
    <div className="create-recipes">
      <div className="my-recipes_container">
        <h1 className="my-recipes_main-heading heading-primary">My Recipes</h1>
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
      <RecipesForm />
    </div>
  );
};

export default CreateRecipes;
