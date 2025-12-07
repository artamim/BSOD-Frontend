// app/list/page.js
"use client";

import { useState, useEffect } from "react";

export default function ListPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/list")
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (links.length === 0) return <p>No links yet.</p>;

  return (
    <table style={{ border: "2px solid white", borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid white", padding: "12px" }}>Original URL</th>
          <th style={{ border: "1px solid white", padding: "12px" }}>Short URL</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link) => (
          <tr key={link.id}>
            <td style={{ border: "1px solid white", padding: "12px" }}>{link.original_url}</td>
            <td style={{ border: "1px solid white", padding: "12px" }}>
              <a href={link.short_url} target="_blank" rel="noopener noreferrer">
                {link.short_url}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}