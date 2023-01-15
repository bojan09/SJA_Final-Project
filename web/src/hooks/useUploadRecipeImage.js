import { useState } from "react";
import { useRecipesContext } from "./useRecipesContext";
import { useAuthContext } from "./useAuthContext";

export const useUploadRecipeImage = () => {
  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  // eslint-disable-next-line
  const [recipePicture, setRecipePicture] = useState("");
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    let formData = new FormData();
    formData.append("slika", recipePicture);

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
  return { handleUpload, error };
};
