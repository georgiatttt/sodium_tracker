import React, { useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [entries, setEntries] = useState([]);
  const [totalSodium, setTotalSodium] = useState(0);
  const [showBoom, setShowBoom] = useState(false);


  // Coconut tree: 1 coconut per successful API call
  const [coconuts, setCoconuts] = useState([]); // { id, size, x, y, mg }
  const coconutIdRef = useRef(0);

  function mgToCoconutSize(mg) {
    const minSize = 25; // px
    const maxSize = 150; // px
    const maxMg = 1000; // mg where coconut hits max size
    const size = minSize + (mg / maxMg) * (maxSize - minSize);
    return Math.max(minSize, Math.min(maxSize, size));
  }

  function addCoconut(mg) {
    coconutIdRef.current += 1;
    const size = mgToCoconutSize(mg);

    // Position coconuts in the tree canopy box
    const x = 20 + Math.random() * 70; // % within coconut-layer
    const y = 0 + Math.random() * 50; // % within coconut-layer



    setCoconuts((prev) => [
      ...prev,
      { id: coconutIdRef.current, size, x, y, mg },
    ]);
  }

  async function fetchSodium(foodName) {
    try {
      setLoading(true);
      setError(null);

      // ✅ ORIGINAL endpoint (the one you started with)
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
        setTotalSodium((prev) => {const next = prev + sodiumMg;
        if (prev < 2000 && next >= 2000) {
          setShowBoom(true);
          // hide boom after animation
          setTimeout(() => setShowBoom(false), 900);
        }
        return next;
      });

        addCoconut(sodiumMg);
      } else {
        setError("No food found!");
      }
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
    setCoconuts([]);
  }

  const sodiumCap = 2000;
  const sodiumRatio = Math.min(totalSodium / sodiumCap, 1);
  const maxLeanDeg = 90;
  const leanDeg = sodiumRatio * maxLeanDeg;

  return (
    <div className="page">
      {showBoom && (
        <div className="boom">
          💥
        </div>
      )}
      {/* Coconut Tree (left side) */}
{/* Coconut Tree (left side) */}
<div className="tree-wrap" aria-hidden="true">
  <div
    className="tree"
    style={{ transform: `translateY(-80px) rotate(${leanDeg}deg)` }}
  >
    <div className="tree-emoji">🌴</div>

    <div className="coconut-layer">
      {coconuts.map((c) => (
        <div
          key={c.id}
          className="coconut"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            fontSize: `${c.size}px`,
          }}
          title={`${Math.round(c.mg)} mg sodium`}
        >
          🥥
        </div>
      ))}
    </div>
  </div>
</div>


      {/* App UI */}
      <div className="app">
        <h1>Sodium Tracker</h1>
        <p>How much sodium does it take to tip the tree?</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a food (e.g., mac and cheese)"
          />
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={handleReset}
            style={{ marginLeft: "8px" }}
          >
            Reset
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

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
    </div>
  );
}
