import React from "react";
import { useState } from "react";

const ListDetailForm = () => {
  const [data, setData] = useState([{ wordOriginal: "", wordTranslate: "" }]);

  const handleClick = () => {
    setData([...data, { wordOriginal: "", wordTranslate: "" }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    const newData = [...data];
    newData[i][name as keyof (typeof newData)[number]] = value;
    setData(newData);
  };

  const handleDelete = (i: number) => {
    const newData = [...data];
    newData.splice(i, 1);
    setData(newData);
  };
  return (
    <div>
      <button onClick={handleClick}>Add</button>
      {data.map((val, i) => (
        <div key={i}>
          <input
            name="wordOriginal"
            value={val.wordOriginal}
            onChange={(e) => handleChange(e, i)}
            placeholder="Mot original"
          />
          <input
            name="wordTranslate"
            value={val.wordTranslate}
            onChange={(e) => handleChange(e, i)}
            placeholder="Traduction"
          />
          <button onClick={() => handleDelete(i)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ListDetailForm;
