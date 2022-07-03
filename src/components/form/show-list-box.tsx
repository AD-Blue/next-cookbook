interface ShowListBoxProps {
  title: string;
  list: string[];
}

const ShowListBox = ({ title, list }: ShowListBoxProps) => {
  return (
    <div className="w-5/12 max-w-5/12">
      <p className="mb-2">{title}</p>
      <div className="shadow rounded-md overflow-hidden overflow-y-auto h-48 max-h-48 scrollbar-hide">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </div>
    </div>
  );
};

export default ShowListBox;
