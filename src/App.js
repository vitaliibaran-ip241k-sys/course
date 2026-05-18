import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

import Register from "./components/Register";
import Login from "./components/Login";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import AdminRoute from "./admin/AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashBoard";
import AdminBooks from "./admin/AdminBooks";
import AdminUsers from "./admin/AdminUser"; 

import { AuthProvider } from "./context/AuthContext";
import { LibraryProvider } from "./context/LibraryContext";

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>

        <BrowserRouter>
          <div className="app">

            {/* NAVBAR */}
            <Navbar />

            {/* MAIN CONTENT */}
            <div className="content">
              <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* USER ROUTES */}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />

                {/* ADMIN ROUTES */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />

                  <Route path="books" element={<AdminBooks />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>

              </Routes>
            </div>

          </div>
        </BrowserRouter>

      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;