import { RecipeDocument } from "../../types/recipe";
import RecipeListCard from "./recipe-list-card";

interface RecipeListProps {
  recipeData: RecipeDocument[];
}

const RecipeList = ({ recipeData }: RecipeListProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {recipeData.map((recipe: RecipeDocument) => (
        <RecipeListCard key={recipe.title} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
