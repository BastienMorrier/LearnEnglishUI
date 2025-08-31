import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

type Words = {
  wordOriginal: string;
  wordTranslate: string;
  creationDate: string;
  lastTestDate: string;
  level: number;
  listId?: number;
}

type List = {
    id?: number;
    name: string;
    words: Word[]
}

const CreateList = () => {
    const [name, setName] = useState(""); 
  const [wordOriginal, setWordOriginal] = useState("");
  const [wordTranslate, setWordTranslate] = useState("");
  const [level, setLevel] = useState(1);

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newList: List = {
      name: name,
      words: [
        {
          wordOriginal: wordOriginal,
          wordTranslate: wordTranslate,
          creationDate: new Date().toISOString(),
          lastTestDate: new Date().toISOString(),
          level: level,
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://localhost:7157/api/List",
        newList
      );
      console.log("Liste ajouté :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <>
      <h1 className="text-sky-950 text-3xl font-bold ml-5 mt-3">Create new list</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
        <input
          type="text"
          placeholder="Nom de la liste"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Mot original"
          value={wordOriginal}
          onChange={(e) => setWordOriginal(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Traduction"
          value={wordTranslate}
          onChange={(e) => setWordTranslate(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Niveau"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          min={1}
          max={5}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </>
  )
}

export default CreateList