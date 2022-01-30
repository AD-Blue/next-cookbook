import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

import Layout from "../../../components/layout/layout";
import RecipeField from "../../../components/form/recipe-field";
import RecipeListField from "../../../components/form/recipe-list-field";
import { Recipe } from "../../../types/recipe";
import ShowListBox from "../../../components/form/show-list-box";
import useSWR from "swr";

const UpdateRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [step, setStep] = useState("");
  const [image, setImage] = useState("");
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [stepList, setStepList] = useState<string[]>([]);

  const router = useRouter();
  const { data: session } = useSession();
  const recipeId = router.query.id;

  const { data: recipeData, error: recipeError } = useSWR(
    `/api/recipe/recipe?recipeId=${recipeId}`
  );

  useEffect(() => {
    if (recipeData) {
      setTitle(recipeData.data.title);
      setDescription(recipeData.data.description);
      setIngredientList(recipeData.data.ingredients);
      setStepList(recipeData.data.steps);

      if (recipeData.data.image) {
        setImage(recipeData.data.image);
      }
    }
  }, [recipeData]);

  if (recipeError) {
    return <p>Error - could not find recipe</p>;
  }

  if (!recipeData) {
    return <p>Loading...</p>;
  }

  const clearAll = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setIngredientList([]);
    setStepList([]);
  };

  const onClick = async (recipeId: string) => {
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

    const updatedRecipe: Recipe = {
      title,
      description,
      ingredients: ingredientList,
      steps: stepList,
      author: session?.user?.email as string,
      image: image ?? "",
    };

    try {
      await axios.put(
        `/api/recipe/update?recipeId=${recipeId}`,
        updatedRecipe,
        config
      );

      clearAll();
      router.push("/");
    } catch {
      console.log("Could not update recipe - something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="mb-2">Update This Recipe</h1>
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

      <button
        className="shadow p-2 rounded-md"
        onClick={() => onClick(recipeData.data._id)}
      >
        Submit
      </button>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export { getServerSideProps };

export default UpdateRecipe;
