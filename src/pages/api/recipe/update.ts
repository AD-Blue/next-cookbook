import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipeId = req.query.recipeId.toString();

  try {
    const recipeCollection = (await clientPromise)
      .db(process.env.DATABASE_NAME as string)
      .collection("recipes");

    await recipeCollection.replaceOne(
      { _id: new ObjectId(recipeId) },
      req.body
    );

    return res.status(200).json({ message: "Successfully updated recipe" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
}
