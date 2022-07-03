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
      setListItem("");
    }
  };

  return (
    <div className="flex flex-col w-5/6 max-w-5/6 mb-4">
      <p className="mb-2">{title}</p>
      <input
        type="text"
        className="border-2 rounded-sm border-gray-200"
        value={listItemState}
        onChange={(e) => setListItem(e.target.value)}
      />
      <button className="shadow mt-2" onClick={() => addToList(listItemState)}>
        Add to {title}
      </button>
    </div>
  );
};

export default RecipeListField;
