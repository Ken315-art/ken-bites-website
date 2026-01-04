import React, { useState, useEffect } from "react";

const ADMIN_PASSWORD = "admin123";
const WHATSAPP_NUMBER = "256753904114";

export default function App() {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [cart, setCart] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const total = cart.reduce((t, i) => t + i.price * i.qty, 0);

  const sendToWhatsApp = () => {
    const items = cart
      .map(i => `• ${i.qty} x ${i.name} – UGX ${i.price * i.qty}`)
      .join("\n");

    const msg = `
🟢 NEW KEN BITES ORDER

${items}

TOTAL: UGX ${total}

Payment: Cash on Delivery
    `;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setCart([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🍗 Ken Bites</h1>

      {!admin && (
        <>
          <input
            placeholder="Admin password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={() => password === ADMIN_PASSWORD && setAdmin(true)}>
            Admin Login
          </button>
        </>
      )}

      {admin && (
        <>
          <h2>Admin Panel</h2>
          <button
            onClick={() =>
              setProducts([...products, { name: "Chicken", price: 15000 }])
            }
          >
            Add Sample Product
          </button>
        </>
      )}

      <h2>Menu</h2>
      {products.map((p, i) => (
        <div key={i}>
          {p.name} – UGX {p.price}
          <button onClick={() => setCart([...cart, { ...p, qty: 1 }])}>
            Add
          </button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((c, i) => (
        <div key={i}>{c.name}</div>
      ))}

      {cart.length > 0 && (
        <button onClick={sendToWhatsApp}>Order on WhatsApp</button>
      )}
    </div>
  );
}
