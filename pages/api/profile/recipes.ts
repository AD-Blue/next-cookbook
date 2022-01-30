import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.query.user.toString();

  if (!user) {
    res.status(404).json({ message: "Could not find user" });
  }

  try {
    const recipeCollection = (await clientPromise)
      .db(process.env.DATABASE_NAME as string)
      .collection("recipes");

    const recipeList = await recipeCollection
      .aggregate([{ $match: { author: user } }])
      .toArray();

    return res.status(200).json({
      message: "Successfully fetched from database",
      data: recipeList,
    });
  } catch {
    console.log("Whoopsie daisy");
    return res.status(500).json({ message: "Internal server error" });
  }
}
