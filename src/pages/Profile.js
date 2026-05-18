import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { LibraryContext } from "../context/LibraryContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const { books } = useContext(LibraryContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 🔥 аватар-ініціали
  const getInitials = (email) => {
    if (!email) return "?";
    return email.slice(0, 2).toUpperCase();
  };

  const totalBooks = books?.length || 0;

  return (
    <div className="profile-container">

      {/* LEFT PANEL */}
      <div className="profile-sidebar">

        {/* 🔥 AVATAR */}
        <div className="avatar">
          {getInitials(user?.email)}
        </div>

        <h2>Профіль</h2>

        <div className="profile-info">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
<p>
  <strong>Статус:</strong>{" "}
  {user?.role === "admin" ? "Адміністратор" : "Читач"}
</p>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h3>{totalBooks}</h3>
            <p>Видань у бібліотеці</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Вийти
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="profile-content">
        <h2>Моя бібліотека</h2>

        {books?.length === 0 ? (
          <div className="empty-state">
            <p>У вас ще немає доданих електронних видань</p>
            <button onClick={() => navigate("/catalog")}>
              Перейти до каталогу
            </button>
          </div>
        ) : (
          <div className="books-list">
            {books?.map((book, index) => (
              <div key={index} className="book-card">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}