import "./RecipePosts.css";

// hooks
import { useState, useEffect } from "react";
import { useRecipesContext } from "../../../hooks/useRecipesContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

// components
import Modal from "../../Modal/Modal";

// icons imgs
import cooking_time from "../../../Archive/icon_time.svg";
import persons from "../../../Archive/icon_plate.svg";
import starsIcon from "../../../Archive/icon_star.svg";
import arrows_right from "../../../Archive/icon_arrows_white.svg";

// meal test images
// import defaultImg from "../../../Archive/mac&cheese.jpg";

const RecipePosts = ({ recipe }) => {
  const [openModal, setOpenModal] = useState(false);
  const [starCount, setStarCount] = useState(recipe.starsCount);

  const [recipePicture, setRecipePicture] = useState("");

  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  // STAR RECIPES
  const addStarToRecipe = async () => {
    try {
      const response = await fetch("/api/v1/recipes/" + recipe._id, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "STAR_RECIPE", payload: json });
        setStarCount(starCount + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //FETCH IMAGE FOR RECIPES
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/v1/storage/:file", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const imgDownloadResponse = await response.json();
      console.log(
        "The RecipePicture__path__",
        imgDownloadResponse.pictureFilePath
      );
      let picAbsoluteFilePath = imgDownloadResponse.pictureFilePath;

      if (response.ok) {
        setRecipePicture(picAbsoluteFilePath);
        console.log("recipePicture path__1:", recipePicture);
        console.log("recipePicture path__1 v2:", picAbsoluteFilePath);

        dispatch({ type: "FETCH_RECIPES", payload: picAbsoluteFilePath });
      }
    };
    if (user) {
      fetchRecipes();
    }
  }, [dispatch, user, recipePicture]);

  return (
    <div className="recipes-posts">
      <div className="recipe-post_container">
        <div className="recipe-post_img">
          <span className="recipe-post_course">{recipe.category}</span>
          <img
            src={recipePicture}
            // src={defaultImg}
            alt={"Recipe Name"}
            onClick={() => setOpenModal(true)}
          />
          <Modal
            key={recipe._id}
            recipe={recipe}
            starCount={starCount}
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>
        <h2 className="recipe-post_heading heading-secondary">
          {recipe.title}
        </h2>
        <p className="recipe-post_paragraph">{recipe.shortDescription}</p>
        <div className="recipe-post_icons-section">
          <img
            className="recipe-post_icon-cooking_time"
            src={cooking_time}
            alt="cooking time img"
          />
          <span className="recipe-post_prepTime">
            {recipe.preperationTime} min
          </span>
          <img
            className="recipe-post_icon-persons"
            src={persons}
            alt="how many persons"
          />
          <span className="recipe-post_persons">{recipe.persons} persons</span>

          <button className="recipe-post_icon-star" onClick={addStarToRecipe}>
            <img
              className="recipe-post_star-img"
              src={starsIcon}
              alt="how many stars"
            />
            <span className="recipe-post_starsCount">{starCount}</span>
          </button>

          <img
            className="recipe-post_icon-arorws_right"
            src={arrows_right}
            alt="arrow-right button"
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipePosts;
