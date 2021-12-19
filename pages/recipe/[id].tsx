import { useRouter } from "next/router";
import useSWR from "swr";
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
    <div>
      <h1>Recipe</h1>
      <p>{recipeData.data.title}</p>
    </div>
  );
};

export default RecipePage;
