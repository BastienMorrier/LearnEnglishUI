import { useParams } from "react-router-dom";
import ListDetailForm from "./listDetailComponent/ListDetailForm";
import ListFlashCard from "./listDetailComponent/ListFlashCard";

const ListDetail = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>No ID found</p>;
  }

  return (
    <>
      <h1 className="text-sky-950 text-3xl font-bold ml-5 mt-3">
        ListDetail - {id}
      </h1>
      <ListDetailForm id={id} />
      <ListFlashCard id={id} />
    </>
  );
};

export default ListDetail;
