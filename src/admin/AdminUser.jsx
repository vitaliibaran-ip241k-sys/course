import React, { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";

export default function AdminUsers() {
  const { users } = useContext(LibraryContext);
  const [search, setSearch] = useState("");

  const filtered = (users || []).filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (email) => {
    if (!email) return "?";
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <div className="admin-users">

      {/* TOOLBAR */}
      <div className="admin-toolbar">

        <div className="admin-counter">
          Користувачів: {users?.length || 0}
        </div>

        <input
          type="text"
          placeholder="Пошук по email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search"
        />

      </div>

      {/* TABLE */}
      <div className="admin-table">

        <div className="admin-row admin-header">
          <span>#</span>
          <span>Користувач</span>
          <span>Email</span>
          <span>Дата</span>
          <span>Роль</span>
        </div>

        {filtered.map((user, index) => (
          <div className="admin-row" key={user.id}>

            <span>{index + 1}</span>

            {/* USER */}
            <span className="user-cell">
              <div className="avatar-small">
                {getInitials(user.email)}
              </div>
              {user.name || "User"}
            </span>

            {/* EMAIL */}
            <span>{user.email}</span>

            {/* DATE */}
<span>
  {user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "—"}
</span>

            {/* ROLE */}
            <span>
              <span className={`badge ${user.role}`}>
                {user.role || "user"}
              </span>
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}