import "./Modal.css";

// hooks
import { useState } from "react";

// icons
import booster from "../../Archive/booster.jpg";
import cooking_time from "../../Archive/icon_time.svg";
import persons from "../../Archive/icon_plate.svg";
import stars from "../../Archive/icon_star.svg";
import modalClose from "../../Archive/icon_close.svg";

const Modal = ({ open, onClose, recipe }) => {
  const [openModal, setOpenModal] = useState(false);
  if (!open) return null;

  return (
    <div onClick={onClose} className="modal-overlay">
      <div className="modal">
        <div className="heading-container">
          <h1 className="modal-heading_primary">{recipe.title}</h1>
          <button onClick={() => setOpenModal(false)}>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />

            <img className="modal-close" src={modalClose} alt="close" />
          </button>
        </div>
        <div className="modal-container">
          {/*Left side*/}
          <div className="left-container">
            <img src={booster} alt="meal" />
            <div className="heading-secondary_container">
              <h2 className="modal-heading_secondary">Best Served For</h2>
              <span className="modal-course">{recipe.category}</span>
            </div>
            <p className="modal-description">{recipe.shortDescription}</p>
            <div className="modal-icons_section">
              <img
                className="cook-time"
                src={cooking_time}
                alt="cooking time img"
              />
              <span className="recipe-post_prepTime">
                {recipe.preperationTime} min
              </span>

              <img className="persons" src={persons} alt="how many persons" />
              <span className="recipe-post_persons">
                {recipe.persons} persons
              </span>

              <img className="stars" src={stars} alt="how many stars" />
              <span className="recipe-post_starsCount">
                {recipe.starsCount}
              </span>
            </div>
          </div>
          {/*Right side*/}
          <div className="right-container">
            <h2 className="modal-heading_secondary">Recipe Details</h2>
            <p className="modal-description modal-right_container-description">
              {recipe.recipeDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
