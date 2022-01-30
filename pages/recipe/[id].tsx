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

  if (recipeError) {
    return <p>Failed to load recipe</p>;
  }

  if (!recipeData || !recipeData.data) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <h1>Recipe</h1>
      <p>{recipeData.data.title}</p>
      <p>{recipeData.data.description}</p>
      <p>Ingredients</p>
      {recipeData.data.ingredients.map((ingredient: string) => (
        <li key={ingredient}>{ingredient}</li>
      ))}
      <p>Steps</p>
      {recipeData.data.steps.map((step: string) => (
        <li key={step}>{step}</li>
      ))}
    </Layout>
  );
};

export default RecipePage;
