import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Пароль має містити мінімум 6 символів");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Паролі не співпадають");
      return;
    }

    console.log("Реєстрація:", form);
    alert("Акаунт успішно створено!");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Створення облікового запису</h2>
        <p>Приєднуйтесь до системи електронних видань і формуйте свою бібліотеку</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ім'я та прізвище"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Пароль (мін. 6 символів)"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Підтвердження паролю"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Створити обліковий запис</button>
        </form>

        <p className="login-link">
          Вже маєте акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </div>
  );
}