import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

import Layout from "../../components/layout/layout";
import fetcher from "../../lib/swr-fetcher";

const RecipePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: recipeData, error: recipeError } = useSWR(
    `/api/recipe/recipe?recipeId=${id}`,
    fetcher
  );
  const { data: session } = useSession();

  if (recipeError) {
    return <p>Failed to load recipe</p>;
  }

  if (!recipeData || !recipeData) {
    return <p>Loading...</p>;
  }

  if (recipeData.data === null) {
    router.push("/");
  }

  const deleteRecipe = async (id: string) => {
    try {
      await axios.delete(`/api/recipe/delete?recipe=${id}`);

      router.push("/");
    } catch {
      console.log("Error - Could not delete recipe");
    }
  };

  return (
    <Layout>
      <h1>Recipe</h1>
      <p>{recipeData.data.title}</p>
      <p>Author: {recipeData.data.author}</p>
      <p>{recipeData.data.description}</p>
      <p>Ingredients</p>
      {recipeData.data.ingredients.map((ingredient: string) => (
        <li key={ingredient}>{ingredient}</li>
      ))}
      <p>Steps</p>
      {recipeData.data.steps.map((step: string) => (
        <li key={step}>{step}</li>
      ))}
      {session?.user?.email === recipeData.data.author && (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => router.push(`/recipe/update/${recipeData.data._id}`)}
          >
            Update this recipe
          </button>
          <button onClick={() => deleteRecipe(recipeData.data._id)}>
            Delete this recipe
          </button>
        </div>
      )}
    </Layout>
  );
};

export default RecipePage;
