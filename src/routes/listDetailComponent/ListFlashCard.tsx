import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeftRight, CircleCheck, CircleX } from "lucide-react";

interface Word {
  id: string; // GUID = string
  wordOriginal: string;
  wordTranslate: string;
  creationDate: string;
  lastTestDate: string;
  level: number;
}

type ListDetailFormProps = {
  id: string
};

const ListFlashCard = ({id}: ListDetailFormProps) => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [evaluation, setEvaluation] = useState<
    Record<string, "up" | "down" | null>
  >({});
  const [originalLevel, setOriginalLevel] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    axios
      .get<Word[]>(`https://localhost:7157/api/Word/flashcards/${id}`)
      .then((response) => {
        console.log(response.data);
        setWords(response.data);
        setLoading(false);

        const levelMap: Record<string, number> = {};
        response.data.forEach((word) => {
          levelMap[word.id] = word.level;
        });
        setOriginalLevel(levelMap);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(evaluation);
  }, [evaluation]);

  const updateWord = async (word: Word) => {
    try {
      await axios.put(`https://localhost:7157/api/Word`, word);
      console.log(`Word ${word.id} updated successfully`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot :", error);
    }
  };

  const toggleCard = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const levelUp = (id: string) => {
    setWords((prevWords) =>
      prevWords.map((word) => {
        if (word.id !== id) return word;
        const initial = originalLevel[id] ?? word.level;
        const prevAction = evaluation[id];

        let newLevel = word.level;

        if (prevAction === "down") {
          // Annule la baisse -> retour au niveau initial
          newLevel = initial;
          // Supprime l’action (on sortira du switch plus bas)
          setEvaluation((prev) => {
            const { [id]: removed, ...rest } = prev;
            return rest;
          });
        } else if (!prevAction) {
          // Première action: +1
          newLevel = Math.min(word.level + 1, 5);
          setEvaluation((prev) => ({ ...prev, [id]: "up" }));
        }

        return { ...word, level: newLevel };
      })
    );
  };

  const levelDown = (id: string) => {
    setWords((prevWords) =>
      prevWords.map((word) => {
        if (word.id !== id) return word;
        const initial = originalLevel[id] ?? word.level;
        const prevAction = evaluation[id];

        let newLevel = word.level;

        if (prevAction === "up") {
          // Annule la hausse -> retour au niveau initial
          newLevel = initial;
          // Supprime l’action
          setEvaluation((prev) => {
            const { [id]: removed, ...rest } = prev;
            return rest;
          });
        } else if (!prevAction) {
          // Première action: baisse
          newLevel = 1;
          setEvaluation((prev) => ({ ...prev, [id]: "down" }));
        }

        return { ...word, level: newLevel };
      })
    );
  };

  if (loading) return <p>Chargement...</p>;
  return (
    <>
      <h1 className="text-sky-950 text-3xl font-bold ml-5 mt-3">FlashCard</h1>
      <div>
        <ul>
          {words.map((word) => (
            <li
              key={word.id}
              className={`flex justify-between w-xs ml-5 my-3 p-5 rounded-lg border-3 border-solid bg-sky-50
              ${
                word.level === 1
                  ? "border-red-500"
                  : word.level === 2
                  ? "border-orange-500"
                  : word.level === 3
                  ? "border-yellow-300"
                  : word.level === 4
                  ? "border-lime-300"
                  : "border-lime-500"
              }`}
            >
              <div className="font-bold text-lg">
                {flipped[word.id] ? word.wordOriginal : word.wordTranslate}
              </div>
              <div className="flex">
                <ArrowLeftRight
                  onClick={() => toggleCard(word.id)}
                  className="mx-2"
                />
                <CircleCheck
                  onClick={() => levelUp(word.id)}
                  className={`mx-2 ${
                    evaluation[word.id] == "up"
                      ? "stroke-white"
                      : "stroke-balck"
                  }`}
                />
                <CircleX
                  onClick={() => levelDown(word.id)}
                  className={`mx-2 ${
                    evaluation[word.id] == "down"
                      ? "stroke-white"
                      : "stroke-balck"
                  }`}
                />
              </div>
            </li>
          ))}
        </ul>
        <button
          className="ml-5 mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
          onClick={() => {
            words.forEach((word) => updateWord(word));
          }}
        >
          Send words
        </button>
      </div>
    </>
  );
};

export default ListFlashCard;
