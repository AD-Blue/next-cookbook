import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const recipeCollection = (await clientPromise)
      .db(process.env.DATABASE_NAME as string)
      .collection("recipes");

    await recipeCollection.insertOne(req.body);

    return res.status(200).json({ message: "Successfully added to database" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}
