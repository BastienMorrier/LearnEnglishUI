import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ margin: "0 10px" }}>Accueil</Link>
      <Link to="/allwords" style={{ margin: "0 10px" }}>AllWords</Link>
      <Link to="/formaddwords" style={{ margin: "0 10px" }}>FormAddWords</Link>
    </nav>
  );
}

export default Navbar;
