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

    const recipeList = await recipeCollection.aggregate().toArray();

    return res.status(200).json({
      message: "Successfully fetched from database",
      data: recipeList,
    });
  } catch {
    console.log("Whoopsie daisy");
    return res.status(500).json({ message: "Internal server error" });
  }
}
