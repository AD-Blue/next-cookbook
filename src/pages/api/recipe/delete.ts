import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipeId = req.query.recipe.toString();

  if (!recipeId) {
    res.status(400).json({ message: "Error - missing recipe id" });
  }

  try {
    const recipeCollection = (await clientPromise)
      .db(process.env.DATABASE_NAME as string)
      .collection("recipes");

    await recipeCollection.deleteOne({
      _id: new ObjectId(recipeId),
    });

    console.log("SUCCESSFULLY DELETED");

    return res
      .status(200)
      .json({ message: "Successfully deleted from database" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
}
