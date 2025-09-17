import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

interface List {
  id: id;
  name: string;
  words: [];
}

const List = () => {
  const [list, setList] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Word[]>("https://localhost:7157/api/List")
      .then((response) => {
        setList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="text-sky-950 text-3xl font-bold ml-5 mt-3">List</h1>
      <a
        href="/createList"
        className="m-5 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
      >
        Create new list
      </a>
      <div className="ml-5">
        <ul className="space-y-2">
          {list.map((lists) => (
            <li key={lists.id} className="flex items-center mb-3">
              <span className="inline-block w-7 h-7 bg-sky-950 rounded-md mr-5"/>
              <div>
                <a
                  href={`/list/${lists.id}`}
                  className="block leading-tight text-sky-900 font-bold text-lg hover:text-blue-600 hover:underline rounded-md transition duration-150"
                >
                  {lists.name}
                </a>
                <p>Liste - nb termes</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default List;
