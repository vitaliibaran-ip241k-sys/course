import React, { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";

export default function AdminDashboard() {
  const { books, users } = useContext(LibraryContext);

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-box">
          <h2>{books?.length || 0}</h2>
          <p>Books in catalog</p>
        </div>

        <div className="stat-box">
          <h2>{users?.length || 0}</h2>
          <p>Registered users</p>
        </div>

      </div>

    </div>
  );
}