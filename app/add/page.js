// app/add/page.js   ← plain JavaScript, no TypeScript

"use client";

import { useState } from "react";
import { shortenUrl } from "./actions";  // ← Import directly

export default function AddUrlPage() {
  const [url1, setUrl1] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAction(formData) {
    setLoading(true);
    setError("");
    setShortUrl("");

    const result = await shortenUrl(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setShortUrl(result.url2);
      setUrl1("");  // clear input on success
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Create BSOD Prank Link 😈</h1>

      <form action={handleAction}>
        <input
          type="url"
          name="url1"
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
    {/*
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(shortUrl);
          alert("Copied to clipboard! 😈"); // optional feedback
        } catch (err) {
          alert("Failed to copy. Please copy manually.");
          console.error(err);
        }
      }}
      style={{
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        cursor: "pointer"
      }}
    >
      Copy to clipboard
    </button>
    */}
  </div>
)}
    </div>
  );
}