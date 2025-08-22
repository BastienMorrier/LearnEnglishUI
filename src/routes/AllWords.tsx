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
      <ul className="ml-5">
        {words.map((word) => (
          <li key={word.id}>{word.wordOriginal} - {word.wordTranslate} <strong>{word.level}</strong></li>
        ))}
      </ul>
    </>
  );
};

export default AllWords;
