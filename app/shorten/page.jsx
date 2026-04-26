"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Shorten() {
  const [url, setUrl] = useState("");
  const [shorturl, setShorturl] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const generate = async () => {
    if (!url || !shorturl) {
      setError(true);
      setMessage("Please fill in both fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError(false);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, shorturl }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(true);
        setMessage(result.message || "Something went wrong");
        return;
      }

      const host =
        process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
      const shortLink = `${host}/${shorturl}`;

      setGenerated(shortLink);
      setUrl("");
      setShorturl("");
      setError(false);
      setMessage("URL generated successfully!");
    } catch (error) {
      console.error(error);
      setError(true);
      setMessage("Failed to generate short URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setError(false);
    setMessage("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 
    bg-purple-50 dark:bg-[#0f172a] transition-colors">

      <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl 
      bg-white dark:bg-[#020617] 
      border border-gray-200 dark:border-gray-800 
      shadow-md dark:shadow-xl">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Create Short URL
        </h1>

        {/* INPUTS */}
        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter your long URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-[#0f172a] 
            text-gray-800 dark:text-white 
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="text"
            placeholder="Custom short name (e.g. mylink)"
            value={shorturl}
            onChange={(e) => setShorturl(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-[#0f172a] 
            text-gray-800 dark:text-white 
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={generate}
          disabled={loading}
          className="w-full mt-5 bg-linear-to-r from-purple-500 to-indigo-500 
          hover:opacity-90 disabled:opacity-60 
          text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          {loading ? "Generating..." : "Generate Short URL"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              error
                ? "text-red-500"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* RESULT */}
        {generated && (
          <div className="mt-6 p-4 rounded-lg text-center 
          border border-purple-200 dark:border-purple-900 
          bg-purple-50 dark:bg-purple-900/20">

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Your Short Link:
            </p>

            <Link
              href={generated}
              target="_blank"
              className="text-purple-700 dark:text-purple-400 font-medium break-all hover:underline"
            >
              {generated}
            </Link>

            {/* COPY BUTTON */}
            <button
              onClick={copyToClipboard}
              className="mt-3 w-full sm:w-auto px-4 py-2 
              bg-linear-to-r from-purple-500 to-indigo-500 
              hover:opacity-90 text-white rounded-lg text-sm transition"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 