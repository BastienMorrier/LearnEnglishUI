import React from "react";
import { useState } from "react";
import axios from "axios";

type ListDetailFormProps = {
  id: string
};

const ListDetailForm = ({id}: ListDetailFormProps) => {
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

  const handleSubmit = async () => {
  // enrichir chaque mot pour correspondre au DTO du backend
  const payload = data.map((word) => ({
    wordOriginal: word.wordOriginal,
    wordTranslate: word.wordTranslate,
    creationDate: new Date().toISOString(),
    lastTestDate: new Date().toISOString(),
    level: 1, // tu peux mettre la valeur que tu veux
    listId: parseInt(id), // idem, à remplacer par ton vrai ListId
  }));

      try {
      const response = await axios.post(
        "https://localhost:7157/api/word/bulk",
        payload
      );
      console.log("Mots ajoutés :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick} 
          className="ml-5 mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">Add</button>
      {data.map((val, i) => (
        <div key={i} className="ml-5">
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
            placeholder="Traduction FR"
          />
          <button onClick={() => handleDelete(i)} 
          className="ml-5 mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
        </div>
      ))}
      <button 
          onClick={handleSubmit}
          className="ml-5 mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
      >Send new words</button>
    </div>
  );
};

export default ListDetailForm;
