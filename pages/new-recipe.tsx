import { useState } from "react";
import axios from "axios";

import Layout from "../components/layout/layout";
import RecipeField from "../components/form/recipe-field";
import RecipeListField from "../components/form/recipe-list-field";
import { Recipe } from "../types/recipe";
import ShowListBox from "../components/form/show-list-box";

const NewRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [step, setStep] = useState("");
  const [image, setImage] = useState("");
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [stepList, setStepList] = useState<string[]>([]);

  const clearAll = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setIngredientList([]);
    setStepList([]);
  };

  const onClick = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      title === "" ||
      description === "" ||
      ingredientList === [] ||
      stepList === []
    ) {
      console.log("Could not upload recipe, missing required fields");
    }

    const newRecipe: Recipe = {
      title,
      description,
      ingredients: ingredientList,
      steps: stepList,
    };

    newRecipe.image = image ? image : "no image";

    try {
      await axios.post("/api/recipe/create", newRecipe, config);

      clearAll();
    } catch {
      console.log("Could not post recipe - something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="mb-2">Create a new Recipe</h1>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="w-1/4 max-w-1/4">
          <RecipeField
            title="Title"
            stateValue={title}
            setStateFunction={setTitle}
          />
          <RecipeField
            title="Description"
            stateValue={description}
            setStateFunction={setDescription}
          />
          <RecipeField
            title="Image (Optional)"
            stateValue={image}
            setStateFunction={setImage}
          />
          <RecipeListField
            title="Ingredients"
            listItemState={ingredient}
            listState={ingredientList}
            setListItem={setIngredient}
            setList={setIngredientList}
          />
          <RecipeListField
            title="Steps"
            listItemState={step}
            listState={stepList}
            setListItem={setStep}
            setList={setStepList}
          />
        </div>
        <div className="flex flex-row w-3/4 max-w-3/4 justify-between">
          <ShowListBox title="Ingredients" list={ingredientList} />
          <ShowListBox title="Steps" list={stepList} />
        </div>
      </div>

      <button className="shadow p-2 rounded-md" onClick={onClick}>
        Submit
      </button>
    </Layout>
  );
};

export default NewRecipe;
