import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ margin: "0 10px" }}>Accueil</Link>
      <Link to="/about" style={{ margin: "0 10px" }}>AllWords</Link>
    </nav>
  );
}

export default Navbar;
