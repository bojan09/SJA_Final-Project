// styles
import "../Recipes/RecipesForm/RecipesForm.css";

// form-data
import FormData from "form-data";

// hooks
import { useRecipesContext } from "../../hooks/useRecipesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";

const UploadImage = () => {
  const [recipePicture, setRecipePicture] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    let formData = new FormData();
    formData.append("recipeImage", recipePicture);

    const response = await fetch("/api/v1/storage", formData, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
    }
    dispatch({ type: "CREATE_RECIPE", payload: json });
  };
  return (
    <div>
      <label>Recipe image</label>
      <img
        className="create-recipe_form-img"
        src={recipePicture}
        alt="recipe pic here"
      />
      <input
        type="file"
        id="img_file"
        name="recipeImage"
        onChange={(e) => {
          setRecipePicture(e.target.files[0]);
        }}
      />
      <label
        htmlFor="img_file"
        className="create-recipe_upload-img_label-btn image-upload_btn"
        onClick={(e) => handleUpload}
      >
        Upload Image
      </label>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default UploadImage;
