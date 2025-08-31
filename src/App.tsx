import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import AllWords from './routes/AllWords';
import Home from "./routes/Home";
import FormAddWords from "./routes/FormAddWords";
import FlashCard from "./routes/FlashCard";
import List from "./routes/List";
import ListDetail from "./routes/ListDetail";
import CreateList from "./routes/CreateList";


const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/allwords" element={<AllWords/>}/>
      <Route path="/formaddwords" element={<FormAddWords/>}/>
      <Route path="/flashcard" element={<FlashCard/>}/>
      <Route path="/list" element={<List/>}/>
      <Route path="/list/:id" element={<ListDetail/>}/>
      <Route path="/createList" element={<CreateList/>}/>
    </Routes>
    </>
  )
}

export default App;
