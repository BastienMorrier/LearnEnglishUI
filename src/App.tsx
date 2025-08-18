import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from './routes/About';
import Home from "./Home";

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
    </>
  )
}

export default App;
