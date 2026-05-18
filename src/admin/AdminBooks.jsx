import React, { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";
import BookModal from "../admin/BookModal";

export default function AdminBooks() {
  const { books, addBook, deleteBook, updateBook } = useContext(LibraryContext);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = (books || []).filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.author?.toLowerCase().includes(search.toLowerCase())
  );

  // SAVE (create + update)
  const handleSave = async (book) => {
    try {
      if (editing) {
        await updateBook(editing.id, book);
      } else {
        await addBook(book);
      }

      setOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // DELETE (одразу без modal)
  const handleDelete = async (id) => {
    const book = books.find((b) => b.id === id);
    if (window.confirm(`Ви впевнені, що хочете видалити це видання "${book.title}"?`)) {
      await deleteBook(id);
    }
  };

  return (
    <div className="admin-books">

      {/* TOOLBAR */}
      <div className="admin-toolbar">

        <input
          type="text"
          placeholder="Пошук видання або автора..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search"
        />

        <button
          className="admin-add-btn"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          + Додати видання
        </button>

      </div>

      {/* TABLE */}
      <div className="admin-table">

        <div className="admin-row admin-header">
          <span>#</span>
          <span>Назва</span>
          <span>Автор</span>
          <span>Категорія</span>
          <span>Ціна</span>
          <span>Рейтинг</span>
          <span>Дії</span>
        </div>

        {filtered.map((book, index) => (
          <div className="admin-row" key={book.id}>

            <span>{index + 1}</span>
            <span>{book.title}</span>
            <span>{book.author}</span>

            <span>
              <span className="badge">{book.tag}</span>
            </span>

            <span>${book.price}</span>
            <span>{book.rating}</span>

            <span className="actions">

              <button
                className="edit-btn"
                onClick={() => {
                  setEditing(book);
                  setOpen(true);
                }}
              >
                Редагувати
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(book.id)}
              >
                Видалити
              </button>

            </span>

          </div>
        ))}

      </div>

      {/* MODAL */}
      <BookModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        editBook={editing}
      />

    </div>
  );
}