import { createContext, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { auth } from "../services/firebase";

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

  const [userBooks, setUserBooks] = useState([]);


  // GLOBAL BOOKS (catalog)
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

  //  USERS
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

 
  //  USER LIBRARY (ONLY HIS BOOKS)
  const fetchUserBooks = async (uid) => {
    try {
      const snapshot = await getDocs(
        collection(db, "users", uid, "books")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserBooks(data);
    } catch (err) {
      console.error("Error loading user books:", err);
    }
  };

  
  // INIT LOAD
  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  
  // BOOK CRUD (CATALOG)
  const addBook = async (book) => {
    await addDoc(collection(db, "books"), book);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, "books", id));
    fetchBooks();
  };

  const updateBook = async (id, updatedData) => {
    await updateDoc(doc(db, "books", id), updatedData);
    fetchBooks();
  };

  
  // ADD BOOK TO USER LIBRARY
  const addBookToUser = async (uid, book) => {
    await addDoc(collection(db, "users", uid, "books"), book);
    fetchUserBooks(uid);
  };

  const removeBookFromUser = async (uid, bookId) => {
    await deleteDoc(doc(db, "users", uid, "books", bookId));
    fetchUserBooks(uid);
  };

  // CART LOGIC
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
        item.id === id ? { ...item, qty: item.qty + 1 } : item
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

  // PROVIDER
  return (
    <LibraryContext.Provider
      value={{
        // data
        books,
        users,
        cart,
        userBooks,

        // fetch
        fetchBooks,
        fetchUsers,
        fetchUserBooks,

        // catalog CRUD
        addBook,
        deleteBook,
        updateBook,

        // user library
        addBookToUser,
        removeBookFromUser,

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