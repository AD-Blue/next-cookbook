import { Dispatch, SetStateAction } from "react";

interface RecipeListFieldProps {
  title: string;
  listItemState: string;
  listState: string[];
  setListItem: Dispatch<SetStateAction<string>>;
  setList: Dispatch<SetStateAction<string[]>>;
}

const RecipeListField = ({
  title,
  listItemState,
  listState,
  setListItem,
  setList,
}: RecipeListFieldProps) => {
  const addToList = (itemToAdd: string) => {
    if (itemToAdd) {
      console.log("ADDING INGREDIENT");
      setList([...listState, itemToAdd]);
    }
  };

  return (
    <div className="shadow">
      <p>{title}</p>
      <input
        type="text"
        value={listItemState}
        onChange={(e) => setListItem(e.target.value)}
      />
      <button onClick={() => addToList(listItemState)}>Add to {title}</button>
    </div>
  );
};

export default RecipeListField;
