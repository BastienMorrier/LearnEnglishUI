import { useEffect, useState } from "react";
import axios from "axios";

interface Word{
  id: number,
  name: string
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
      <h2>AllWords</h2>
      <ul>
        {
          words.map((word)=>(
            <li key={word.id}>{word.name}</li>
          ))
        }
      </ul>
    </>
  )
}

export default AllWords