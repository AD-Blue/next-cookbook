import Link from "next/link";
import { RecipeDocument } from "../../types/recipe";

interface RecipeListCardProps {
  recipe: RecipeDocument;
}

const RecipeListCard = ({ recipe }: RecipeListCardProps) => {
  return (
    <Link href={`/recipe/${recipe._id}`} passHref>
      <div className="shadow-xl rounded-lg mt-8 p-4 cursor-pointer border-2 border-brandBrown hover:brightness-125">
        <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
        <p>{recipe.description}</p>
      </div>
    </Link>
  );
};

export default RecipeListCard;
