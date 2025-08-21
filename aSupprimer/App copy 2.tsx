// src/components/AddWord.jsx
import { useState } from 'react';
interface WordEnglish {
  id: number,
  FR: string,
  ENG: string,
  status: boolean
}

const AddWord = () => {
  
  const[word, setWords] = useState<WordEnglish[]>([
    {id: 1, FR: "Bonjour", ENG: "Hello", status: true},
    {id: 2, FR: "Monsieur", ENG: "Sir", status: false},
    {id: 3, FR: "Bonsoir", ENG: "Goodnight", status: true},
  ]);

  const handleChange = (id: number) => {
    console.log(id)
    // prends l'id
    // refait un nouveau tableau avec le changement de donnée
    const newTab = word.map((a)=>{
      if(a.id == id){
        return {...a, status: !a.status }
      }
      return a;
    })

    setWords(newTab)
  }

  return (
    <>
    <ul>
      {
        word.map((e)=> <li key={e.id} onClick={() => handleChange(e.id)}>{e.status ? e.FR : e.ENG}</li>)
      }
    </ul>
      
    </>
  );
};

export default AddWord;
