import Link from "next/link";
import { RecipeDocument } from "../../types/recipe";

interface RecipeListCardProps {
  recipe: RecipeDocument;
}

const RecipeListCard = ({ recipe }: RecipeListCardProps) => {
  return (
    <Link href={`/recipe/${recipe._id}`} passHref>
      <div className="shadow rounded-lg mt-8 p-4 cursor-pointer">
        <p>{recipe.title}</p>
        <p>{recipe.description}</p>
      </div>
    </Link>
  );
};

export default RecipeListCard;
