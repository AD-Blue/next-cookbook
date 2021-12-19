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
    <div className="w-4/5 max-w-4/5 mb-4">
      <p className="mb-2">{title}</p>
      <input
        type="text"
        value={stateValue}
        onChange={(e) => setStateFunction(e.target.value)}
        className="shadow w-full"
      />
    </div>
  );
};

export default RecipeField;
