import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { RecipeDocument } from "../../../types/recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipeId = req.query.recipeId.toString();

  if (!recipeId) {
    res.status(400).json({ message: "Error - missing recipe id" });
  }

  console.log(`ID: ${recipeId}`);

  try {
    const recipeCollection = (await clientPromise)
      .db(process.env.DATABASE_NAME as string)
      .collection("recipes");

    const recipe = await recipeCollection.findOne({
      _id: new ObjectId(recipeId),
    });

    return res.status(200).json({
      message: "Successfully fetched from database",
      data: recipe,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}
