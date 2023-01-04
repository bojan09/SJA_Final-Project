import { useState } from "react";
import { useRecipesContext } from "../../../hooks/useRecipesContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

const RecipesImageUpload = () => {
  const [recipePicture, setRecipePicture] = useState("");
  const [error, setError] = useState(null);

  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  const handleUpload = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/v1/storage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      <img
        className="create-recipe_form-img"
        src={recipePicture}
        alt="recipe pic here"
      />
      <input
        type="file"
        id="img"
        value={recipePicture}
        onChange={(e) => setRecipePicture(e.target.value)}
      />
      {error && <div className="error">{error}</div>}

      <label
        htmlFor="img"
        className="create-recipe_upload-img_label-btn image-upload_btn"
      >
        Upload Image
      </label>
    </div>
  );
};

export default RecipesImageUpload;
