"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Websites() {
  const [websites, setWebsites] = useState<{ name: string; url: string; }[]>([]);
  const [newWebsite, setNewWebsite] = useState({ name: "", url: "" });

  const addWebsite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWebsites([...websites, newWebsite]);
    setNewWebsite({ name: "", url: "" });
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Common Used Websites</h1>
        <form onSubmit={addWebsite} className="mb-4">
          <input
            type="text"
            placeholder="Website Name"
            value={newWebsite.name}
            onChange={(e) =>
              setNewWebsite({ ...newWebsite, name: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <input
            type="url"
            placeholder="Website URL"
            value={newWebsite.url}
            onChange={(e) =>
              setNewWebsite({ ...newWebsite, url: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Website
          </button>
        </form>
        <ul>
          {websites.map((site, index) => (
            <li key={index} className="mb-2">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {site.name}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
