// app/add/page.js   ← plain JavaScript, no TypeScript

"use client";

import { useState } from "react";

export default function AddUrlPage() {
  const [url1, setUrl1] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url1.trim()) return;

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const res = await fetch("http://localhost:8000/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url1: url1.trim() }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const data = await res.json();
      setShortUrl(data.url2);  // this is your short link
      setUrl1("");             // clear the input
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Shorten Your URL</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="https://example.com/very/long/url..."
          value={url1}
          onChange={(e) => setUrl1(e.target.value)}
          required
          className="new-url-input"
          autoFocus
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
      )}

      {shortUrl && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Your short link:</h2>
          <p style={{ fontSize: "1.4rem", wordBreak: "break-all" }}>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0066ff" }}
            >
              {shortUrl}
            </a>
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          >
            Copy to clipboard
          </button>
        </div>
      )}
    </div>
  );
}