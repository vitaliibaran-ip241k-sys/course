import React, { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useContext(LibraryContext);

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const cashback = totalPrice * 0.05; // 5%

const handleCheckout = () => {
  alert(
    "Замовлення успішно оформлено (DEMO MODE)\n\n" +
    "Платформа працює в демонстраційному режимі.\n" +
    "Реальні платіжні транзакції не виконуються."
  );

  clearCart(); 
};

  return (
    <div className="cart-page">

      {/* LEFT - ITEMS */}
      <div className="cart-left">

        <h2>Кошик</h2>

        {cart.length === 0 ? (
          <div className="empty-state">
            <p>Кошик порожній</p>
            <button onClick={() => navigate("/catalog")}>
              Перейти до каталогу
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">

              <img src={item.cover} alt={item.title} />

              <div className="cart-info">
                <h4>{item.title}</h4>
                <p>{item.author}</p>
                <p>${item.price}</p>
              </div>

              {/* qty controls */}
              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>

            </div>
          ))
        )}

      </div>

      {/* RIGHT - SUMMARY */}
      <div className="cart-summary">

        <h3>Сума замовлення</h3>

        <div className="summary-line">
          <span>Товари:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <div className="summary-line">
          <span>Кешбек (5%):</span>
          <span>${cashback.toFixed(2)}</span>
        </div>

        <hr />

        <div className="summary-total">
          <span>Разом:</span>
          <span>${(totalPrice - cashback).toFixed(2)}</span>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Оформити замовлення
        </button>

        <button
          className="continue-btn"
          onClick={() => navigate("/catalog")}
        >
          Продовжити покупки
        </button>

        <button className="clear-btn" onClick={clearCart}>
          Очистити кошик
        </button>

      </div>

    </div>
  );
}