import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LibraryContext } from "../context/LibraryContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(LibraryContext);

  const navigate = useNavigate();

  return (
    <nav className="navbar">

      <div className="logo">EC-Reading</div>

      <div className="nav-links">
        <Link to="/">Головна</Link>
        <Link to="/catalog">Каталог</Link>
      </div>

      <div className="nav-actions">

        {/* 🛒 CART */}
        <Link to="/cart" className="cart-link">🛒<span className="cart-badge">
            {cart.length}
          </span>
        </Link>

        {/* ADMIN BUTTON */}
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="admin-btn">Адмін панель</button>
        )}

        {user ? (
          <>
            <Link to="/profile">Профіль</Link>
            <button onClick={logout} className="register-btn">Вийти</button>
          </>
        ) : (
          <>
            <Link to="/login">Увійти</Link>
            <Link to="/register" className="register-btn">Реєстрація</Link>
          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;