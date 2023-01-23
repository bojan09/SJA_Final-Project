import "./RecipesForm.css";

// components

// hooks
import { useRecipesContext } from "../../../hooks/useRecipesContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

import { useState } from "react";

const RecipesForm = () => {
  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [preperationTime, setPreperationTime] = useState("");
  const [persons, setPersons] = useState("");
  const [error, setError] = useState(null);

  const [fileName, setFileName] = useState("Recipe picture here");
  const [image, setImage] = useState({ preview: "", data: "", filePath: "" });
  const [recipePicture, setRecipePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Upload recipe image
    let formData = new FormData();
    formData.append("recipeImage", image.data);

    const uploadResponse = await fetch("/api/v1/storage", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const recipePicturePath = await uploadResponse.json();
    console.log("The RecipePicture__path__", recipePicturePath.pictureFilePath);
    let picAbsoluteFilePath = recipePicturePath.pictureFilePath;

    if (uploadResponse.ok) {
      setRecipePicture(picAbsoluteFilePath);

      console.log("recipePicture path__1:", recipePicture);
      console.log("recipePicture path__1 v2:", picAbsoluteFilePath);

      dispatch({ type: "CREATE_RECIPE", payload: formData });
    }

    // Uploading the recipe

    const recipe = {
      category,
      title,
      recipeDescription,
      preperationTime,
      shortDescription,
      persons,
      recipePicture,
    };

    const response = await fetch("/api/v1/recipes/", {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log(json.error);
    }

    if (response.ok) {
      setCategory("");
      setTitle("");
      setRecipeDescription("");
      setShortDescription("");
      setPreperationTime("");
      setPersons("");
      setRecipePicture(picAbsoluteFilePath);
      setError(null);
      console.log("recipePicture path__2:", recipePicture);
      dispatch({ type: "CREATE_RECIPE", payload: json });
    }
  };

  const onChange = (e) => {
    setRecipePicture(recipePicture);
    console.log("recipePicture path__3:", recipePicture);
    setFileName(URL.createObjectURL(e.target.files[0]));

    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      filePath: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <div className="create-recipe_container">
      <form className="create-recipe_form" onSubmit={handleSubmit}>
        <div className="create-recipe_form-img heading-secondary">
          <label>Recipe image</label>
          <img
            className="create-recipe_form-img"
            src={image.preview}
            width="100"
            height="100"
            alt={fileName}
          />
          <input
            type="file"
            id="img_file"
            name="recipeImage"
            onChange={onChange}
          />

          <label
            htmlFor="img_file"
            className="create-recipe_upload-img_label-btn image-upload_btn"
          >
            Upload Image
          </label>
        </div>

        <div className="create-recipe_form-title heading-secondary">
          <label htmlFor="recipe_title">Recipe Title</label>

          <input
            required
            type="text"
            placeholder="Homemade Pizza"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="create-recipe_form-recipeDescription heading-secondary">
          <label htmlFor="recipeDescription">Recipe</label>
          <textarea
            required
            placeholder="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures"
            id="recipeDescription"
            onChange={(e) => setRecipeDescription(e.target.value)}
            value={recipeDescription}
          ></textarea>
        </div>

        <div className="create-recipe_form-category heading-secondary">
          <label htmlFor="recipeCategory">Category</label>
          <select
            name="recipeCategory"
            placeholder="Breakfast"
            id="recipeCategory"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
          >
            <option value="" disabled defaultChecked hidden>
              Breakfast
            </option>

            <option value="breakfast">Breakfast</option>

            <option value="brunch">Brunch</option>

            <option value="lunch">Lunch</option>

            <option value="dinner">Dinner</option>
          </select>
        </div>

        <div className="create-recipe_form-preperationTime heading-secondary">
          <label htmlFor="preperationTime">Preperation Time</label>
          <input
            type="number"
            placeholder="45"
            id="preperationTime"
            min="1"
            max="150"
            onChange={(e) => setPreperationTime(e.target.value)}
            value={preperationTime}
            required
          />
        </div>

        <div className="create-recipe_form-persons heading-secondary">
          <label htmlFor="persons">No. Persons</label>
          <input
            type="number"
            placeholder="4"
            name="persons"
            min="1"
            max="15"
            onChange={(e) => setPersons(e.target.value)}
            value={persons}
            required
          />
        </div>

        <div className="create-recipe_form-shortDescription heading-secondary">
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            placeholder="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage"
            id="shortDescription"
            onChange={(e) => setShortDescription(e.target.value)}
            value={shortDescription}
            required
          ></textarea>
        </div>

        <button className="create-recipe_form-btn save-btn">save</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default RecipesForm;
