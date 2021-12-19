import { Dispatch, SetStateAction } from "react";

interface RecipeFieldProps {
  title: string;
  stateValue: string;
  setStateFunction: Dispatch<SetStateAction<string>>;
}

const RecipeField = ({
  title,
  stateValue,
  setStateFunction,
}: RecipeFieldProps) => {
  return (
    <div>
      <p>{title}</p>
      <input
        type="text"
        value={stateValue}
        onChange={(e) => setStateFunction(e.target.value)}
        className="shadow"
      />
    </div>
  );
};

export default RecipeField;
