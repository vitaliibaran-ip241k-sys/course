import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/books">Books</Link>
        <Link to="/admin/users">Users</Link>

        <Link to="/">← Site</Link>

        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      {/* CONTENT */}
      <div className="admin-content">
        <Outlet />
      </div>

    </div>
  );
}