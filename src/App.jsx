import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [entries, setEntries] = useState([]);
  const [totalSodium, setTotalSodium] = useState(0);

  async function fetchSodium(foodName) {
    try {
      setLoading(true);
      setError(null);

      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        foodName
      )}&search_simple=1&action=process&json=1`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      if (data.products && data.products.length > 0) {
        const first = data.products[0];
        const sodiumMg = first.nutriments?.sodium_100g
          ? first.nutriments.sodium_100g * 1000
          : 0;

        setEntries((prev) => [...prev, { name: foodName, sodium: sodiumMg }]);
        setTotalSodium((prev) => prev + sodiumMg);
      } else setError("No food found!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchSodium(query);
      setQuery("");
    }
  }

  function handleReset() {
    setEntries([]);
    setTotalSodium(0);
    setError(null);
  }

  // bottle fill is capped at 1000 mg
  const bottleFill = Math.min(totalSodium, 1000);
  const extraSand = totalSodium > 1000 ? totalSodium - 1000 : 0;
  const pileCount = Math.ceil(extraSand / 1000);
  const lastPileFill = extraSand % 1000;

  return (
    <div className="app">
      <h1>Sodium Sidekick 🧂</h1>
      <p>Track your salty snacks — don’t flood the beach!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a food (e.g., mac and cheese)"
        />
        <button type="submit">Add</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: "8px" }}>
          Reset
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="scene">
        {/* the bottle */}
        <div className="bottle">
          <div
            className="bottle-fill"
            style={{ height: `${(bottleFill / 1000) * 100}%` }}
            title={`${Math.round(bottleFill)} mg in the bottle`}
          ></div>
        </div>

        {/* sand piles around the bottle */}
        <div className="sand-area">
          {Array.from({ length: pileCount }, (_, i) => {
            const fill = i < pileCount - 1 ? 100 : (lastPileFill / 1000) * 100;
            return (
              <div
                key={i}
                className="sandpile"
                style={{ clipPath: `polygon(0 100%, 50% ${100 - fill}%, 100% 100%)` }}
                title={`${Math.round(Math.min(1000, lastPileFill || 1000))} mg`}
              ></div>
            );
          })}
        </div>

        {/* mermaid friend */}
        <div className="mermaid">🧜‍♀️</div>
      </div>

      <p>
        Total sodium: <strong>{Math.round(totalSodium)}</strong> mg
      </p>

      <ul>
        {entries.map((item, i) => (
          <li key={i}>
            {item.name} — {Math.round(item.sodium)} mg
          </li>
        ))}
      </ul>
    </div>
  );
}

