import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import AllWords from './routes/AllWords';
// import Home from "./Home;
import Home from "./routes/Home";
import FormAddWords from "./routes/FormAddWords";

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/allwords" element={<AllWords/>}/>
      <Route path="/formaddwords" element={<FormAddWords/>}/>
    </Routes>
    </>
  )
}

export default App;
