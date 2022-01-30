import useSWR from "swr";

import fetcher from "../../lib/swr-fetcher";
import { RecipeDocument } from "../../types/recipe";
import RecipeListCard from "./recipe-list-card";

const RecipeList = () => {
  const { data: recipeData, error: recipeError } = useSWR(
    "/api/recipe/recipes",
    fetcher
  );

  if (recipeError) {
    return <p>Error fetching recipe data</p>;
  }

  if (!recipeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {recipeData.data.map((recipe: RecipeDocument) => (
        <RecipeListCard key={recipe.title} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
