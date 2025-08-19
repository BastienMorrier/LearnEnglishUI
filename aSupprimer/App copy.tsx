// src/components/AddWord.jsx
import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router";
// import Home from "../src/Home";
import Navbar from "../src/components/Navbar";

// type Word = {
//   wordOriginal: string;
//   wordTranslate: string;
//   creationDate: string;
//   lastTestDate: string;
//   level: number;
// };

const App = () => {
//   const [wordOriginal, setWordOriginal] = useState("");
//   const [wordTranslate, setWordTranslate] = useState("");
//   const [level, setLevel] = useState(1);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const newWord: Word = {
//       wordOriginal: wordOriginal,
//       wordTranslate: wordTranslate,
//       creationDate: new Date().toISOString(),
//       lastTestDate: new Date().toISOString(),
//       level: level,
//     };

//     try {
//       const response = await axios.post(
//         "https://localhost:7157/api/word",
//         newWord
//       );
//       console.log("Mot ajouté :", response.data);
//     } catch (error) {
//       console.error("Erreur lors de l'ajout :", error);
//     }
//   };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     placeholder="Mot original"
    //     value={wordOriginal}
    //     onChange={(e) => setWordOriginal(e.target.value)}
    //     required
    //   />
    //   <input
    //     type="text"
    //     placeholder="Traduction"
    //     value={wordTranslate}
    //     onChange={(e) => setWordTranslate(e.target.value)}
    //     required
    //   />
    //   <input
    //     type="number"
    //     placeholder="Niveau"
    //     value={level}
    //     onChange={(e) => setLevel(Number(e.target.value))}
    //     min={1}
    //   />
    //   <button type="submit">Ajouter</button>
    // </form>
    <>
    <Navbar/>
      <h1>Welcome</h1>
    </>
  );
};

export default App;
