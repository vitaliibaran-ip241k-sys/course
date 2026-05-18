import React, { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";
import BookCard from "../components/BookCard";

export default function Catalog() {
  const { books, addToCart } = useContext(LibraryContext);

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Frontend", "Backend", "JavaScript"];

  const filteredBooks = (books || [])
    .filter((b) => category === "All" || b.tag === category)
    .filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="catalog-container">

      <h2>Каталог видань</h2>

      <input
        type="text"
        placeholder="Пошук видання..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active-cat" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onAdd={() => addToCart(book)}
            />
          ))
        ) : (
          <p style={{ color: "#94a3b8" }}>
            Нічого не знайдено
          </p>
        )}
      </div>

    </div>
  );
}