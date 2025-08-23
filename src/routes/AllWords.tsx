import { useEffect, useState } from "react";
import axios from "axios";

interface Word {
  id: string; // GUID = string
  wordOriginal: string;
  wordTranslate: string;
  creationDate: string;
  lastTestDate: string;
  level: number;
}

const AllWords = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Word[]>("https://localhost:7157/api/Word")
      .then((response) => {
        setWords(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      <h1 className="text-sky-950 text-3xl font-bold ml-5 mt-3">AllWords</h1>
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
          {words.map((word) => (
            <tr className="hover:bg-gray-50">
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
  );
};

export default AllWords;
