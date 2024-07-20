"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { websiteDao } from "@/lib/db";
import { Website } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function Websites() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [newWebsite, setNewWebsite] = useState({
    name: "",
    url: "",
    imageUrl: "",
    tags: "",
    notes: "",
  });

useEffect(() => {
  const fetchWebsites = async () => {
    const sites = await websiteDao.readAll();
    setWebsites(sites);
  };
  fetchWebsites();
}, []);

  const addWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdWebsite = await websiteDao.create({
      ...newWebsite,
      tags: newWebsite.tags.split(",").map((tag) => tag.trim()),
    });
    if (createdWebsite) {
      setWebsites([...websites, createdWebsite]);
      setNewWebsite({ name: "", url: "", imageUrl: "", tags: "", notes: "" });
    }
  };

  const deleteWebsite = async (id: string) => {
    const success = await websiteDao.delete(id);
    if (success) {
      setWebsites(websites.filter((website) => website.id !== id));
    }
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
          <input
            type="url"
            placeholder="imageUrl"
            value={newWebsite.imageUrl}
            onChange={(e) =>
              setNewWebsite({ ...newWebsite, imageUrl: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="tags"
            value={newWebsite.tags}
            onChange={(e) =>
              setNewWebsite({ ...newWebsite, tags: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="notes"
            value={newWebsite.notes}
            onChange={(e) =>
              setNewWebsite({ ...newWebsite, notes: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Website
          </Button>
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
