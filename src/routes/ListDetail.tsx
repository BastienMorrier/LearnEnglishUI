import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ListDetailForm from "./listDetailComponent/listDetailForm";
import ListDetailTable from "./listDetailComponent/ListDetailTable";

type Word = {
  id: number;
  wordOriginal: string;
  wordTranslate: string;
  creationDate: string;
  lastTestDate: string;
  level: number;
  listId: number;
};

type NewWord = Omit<Word, "id">;

const ListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const listId = Number(id);

  const [wordOriginal, setWordOriginal] = useState("");
  const [wordTranslate, setWordTranslate] = useState("");
  const [level, setLevel] = useState(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newWord: NewWord = {
      wordOriginal: wordOriginal,
      wordTranslate: wordTranslate,
      creationDate: new Date().toISOString(),
      lastTestDate: new Date().toISOString(),
      level: level,
      listId: listId,
    };

    try {
      const response = await axios.post(
        "https://localhost:7157/api/word",
        newWord
      );
      console.log("Mot ajouté :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <>
      <h1 className="text-sky-950 text-3xl font-bold ml-5 mt-3">
        ListDetail - {id}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mot original"
          value={wordOriginal}
          onChange={(e) => setWordOriginal(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Traduction"
          value={wordTranslate}
          onChange={(e) => setWordTranslate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Niveau"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          min={1}
        />
        <button type="submit">Add</button>
      </form>

      <ListDetailTable />
      <ListDetailForm />
    </>
  );
};

export default ListDetail;
