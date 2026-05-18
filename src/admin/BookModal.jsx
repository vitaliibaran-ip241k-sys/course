import React, { useEffect, useState } from "react";

export default function BookModal({ isOpen, onClose, onSave, editBook }) {

  const [form, setForm] = useState({
    title: "",
    author: "",
    tag: "",
    price: "",
    rating: "",
    cover: "",
  });

  useEffect(() => {
    if (editBook) {
      setForm(editBook);
    } else {
      setForm({
        title: "",
        author: "",
        tag: "",
        price: "",
        rating: "",
        cover: "",
      });
    }
  }, [editBook]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>{editBook ? "Редагувати видання" : "Нове видання"}</h2>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Назва" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Автор" />
        <input name="tag" value={form.tag} onChange={handleChange} placeholder="Категорія" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Ціна" />
        <input name="rating" value={form.rating} onChange={handleChange} placeholder="Рейтинг" />
        <input name="cover" value={form.cover} onChange={handleChange} placeholder="URL обкладинки" />

        {form.cover && (
          <img
            src={form.cover}
            alt="preview"
            style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <div className="modal-actions">

          <button onClick={() => onSave(form)} className="save-btn">
            Зберегти
          </button>

          <button onClick={onClose} className="cancel-btn">
            Скасувати
          </button>

        </div>

      </div>

    </div>
  );
}