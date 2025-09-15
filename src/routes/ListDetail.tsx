import { useParams } from "react-router-dom";
import ListDetailForm from "./listDetailComponent/ListDetailForm";
import ListDetailTable from "./listDetailComponent/ListDetailTable";

const ListDetail = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <h1 className="text-sky-950 text-3xl font-bold ml-5 mt-3">
        ListDetail - {id}
      </h1>
      <ListDetailTable />
      <ListDetailForm />
    </>
  );
};

export default ListDetail;
