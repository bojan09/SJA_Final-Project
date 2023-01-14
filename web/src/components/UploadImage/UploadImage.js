// styles
import "../Recipes/RecipesForm/RecipesForm.css";

// hooks
import { useRecipesContext } from "../../hooks/useRecipesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";

const UploadImage = () => {
  const [recipePicture, setRecipePicture] = useState("");
  const [error, setError] = useState(null);

  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const img = {
      recipePicture,
    };

    const response = await fetch("/api/v1/storage", {
      method: "PATCH",
      body: JSON.stringify(img),
      headers: {
        "Content-Type": "application/json",
        slika: "slika",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setRecipePicture("");
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
        id="file"
        value={recipePicture}
        onChange={handleUpload}
      />

      <label
        htmlFor="img"
        className="create-recipe_upload-img_label-btn image-upload_btn"
      >
        Upload Image
      </label>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default UploadImage;
