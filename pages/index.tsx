import type { NextPage } from "next";
import useSWR from "swr";

import Layout from "../components/layout/layout";
import RecipeListCard from "../components/recipe/recipe-list-card";
import fetcher from "../lib/swr-fetcher";
import { RecipeDocument } from "../types/recipe";

const Home: NextPage = () => {
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
    <Layout>
      <h1>Home</h1>
      <div>
        {recipeData.data.map((recipe: RecipeDocument) => (
          <RecipeListCard key={recipe.title} recipe={recipe} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
