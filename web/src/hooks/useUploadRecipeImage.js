import { useState } from "react";
import { useRecipesContext } from "./useRecipesContext";
import { useAuthContext } from "./useAuthContext";

export const useUploadRecipeImage = () => {
  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  const [recipePicture, setRecipePicture] = useState("");
  const [filename, setFilename] = useState("Recipe picture here");
  const [uploadedFile, setUploadedFile] = useState({});
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setRecipePicture(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const formData = new FormData();
    formData.append("slika", recipePicture);

    const response = await fetch("/api/v1/storage", formData, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    const { filePath } = response.data;

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setUploadedFile({ filePath });
    }
    dispatch({ type: "CREATE_RECIPE", payload: json });
  };
  return {
    handleUpload,
    onChange,
    uploadedFile,
    filename,
  };
};
