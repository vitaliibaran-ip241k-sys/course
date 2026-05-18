import React, { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";

export default function BookCard({ book }) {
  const { addToCart, cart } = useContext(LibraryContext);

  const isInCart = cart.some((item) => item.id === book.id);

  return (
    <div className="book-card">

      <img
        src={book.cover}
        alt={book.title}
        className="book-cover"
      />

      <span className="book-tag">{book.tag}</span>

      <h4>{book.title}</h4>
      <p>{book.author}</p>

      <div className="book-info">
        <span>⭐ {book.rating}</span>
        <span>${book.price}</span>
      </div>

      <button
        onClick={() => addToCart(book)}
        disabled={isInCart}
        className={isInCart ? "added-btn" : "add-btn"}
      >
        {isInCart ? "✓ Додано" : "Додати в кошик"}
      </button>

    </div>
  );
}