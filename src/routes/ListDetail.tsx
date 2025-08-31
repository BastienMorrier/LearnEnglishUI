import React from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

type Word = {
 id: string;
  wordOriginal: string;
  wordTranslate: string;
  creationDate: string;
  lastTestDate: string;
  level: number;
  listId: number;
};

const ListDetail = () => {
const { id } = useParams<{ id: string }>();
  const listId = Number(id); 

  const [wordOriginal, setWordOriginal] = useState("");
  const [wordTranslate, setWordTranslate] = useState("");
  const [level, setLevel] = useState(1);
  const [allWords, setAllWords] = useState<Word[]>([]);

  
  useEffect(() => {
    axios
      .get<Word[]>("https://localhost:7157/api/Word")
      .then((response) => {
        setAllWords(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newWord: Word = {
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
    
    <h1 className="text-sky-950 text-3xl font-bold ml-5 mt-3">ListDetail - {id}</h1>
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
      <table className="table-fixed border border-gray-300 w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Original word</th>
            <th className="border border-gray-300 px-4 py-2">Translation</th>
            <th className="border border-gray-300 px-4 py-2">Level</th>
            <th className="border border-gray-300 px-4 py-2">Creation date</th>
            <th className="border border-gray-300 px-4 py-2">Last test date</th>
          </tr>
        </thead>
        <tbody>
          {allWords.map((word) => (
            <tr key={word.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {word.wordOriginal}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {word.wordTranslate}
              </td>
              <td className="border border-gray-300 px-4 py-2">{word.level}</td>
              <td className="border border-gray-300 px-4 py-2">
                {word.creationDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {word.lastTestDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  )
}

export default ListDetail