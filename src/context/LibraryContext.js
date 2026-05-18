import { createContext, useEffect, useState } from "react";
import { db } from "../services/firebase";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchBooks = async () => {
    try {
      const snapshot = await getDocs(collection(db, "books"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBooks(data);
    } catch (err) {
      console.error("Error loading books:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);


  // CREATE
  const addBook = async (book) => {
    try {
      await addDoc(collection(db, "books"), book);
      fetchBooks();
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  // DELETE
  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id));
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  // UPDATE
  const updateBook = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, "books", id), updatedData);
      fetchBooks();
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  // =========================
  // 🛒 CART LOGIC
  // =========================
  const addToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id);

      if (existing) {
        return prev.map((item) =>
          item.id === book.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...book, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <LibraryContext.Provider
      value={{
        // data
        books,
        users,
        cart,

        // firebase actions
        fetchBooks,
        fetchUsers,
        addBook,
        deleteBook,
        updateBook,

        // cart
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};