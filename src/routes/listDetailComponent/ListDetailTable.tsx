import { useEffect, useState } from "react";
import axios from "axios";

type Word = {
  id: number;
  wordOriginal: string;
  wordTranslate: string;
  creationDate: string;
  lastTestDate: string;
  level: number;
  listId: number;
};

const ListDetailTable = () => {
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

  return (
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
  );
};

export default ListDetailTable;
