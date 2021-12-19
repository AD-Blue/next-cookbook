import { ObjectId } from "mongodb";

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image?: string;
}

export interface RecipeDocument {
  _id: ObjectId;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image?: string;
}
