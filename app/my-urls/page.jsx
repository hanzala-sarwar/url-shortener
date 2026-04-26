"use client";

import React, { useEffect, useState } from "react";

export default function MyUrls() {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const res = await fetch("/api/my-urls", {
                    credentials: "include",
                });
                const data = await res.json();

                if (!res.ok) {
                    setError(data.message || "Not authorized");
                } else {
                    setUrls(data.urls);
                }
            } catch (err) {
                setError("Failed to fetch URLs");
            } finally {
                setLoading(false);
            }
        };

        fetchUrls();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setMessage("Copied to clipboard!");
        setTimeout(() => setMessage(""), 2000);
    };

    const host =
        process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";

    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 
    bg-purple-50 dark:bg-[#0f172a] transition-colors">

            <div className="max-w-5xl mx-auto">

                {/* TITLE */}
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center 
        text-gray-800 dark:text-white">
                    My Short URLs
                </h1>

                {/* MESSAGE */}
                {message && (
                    <p className="text-center text-sm mb-4 text-green-600 dark:text-green-400">
                        {message}
                    </p>
                )}

                {/* LOADING */}
                {loading && (
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        Loading...
                    </p>
                )}

                {/* ERROR */}
                {!loading && error && (
                    <p className="text-center text-red-500">{error}</p>
                )}

                {/* EMPTY */}
                {!loading && !error && urls.length === 0 && (
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        You have not created any short URLs yet.
                    </p>
                )}

                {/* LIST */}
                {!loading && !error && urls.length > 0 && (
                    <div className="grid gap-4">
                        {urls.map((item) => {
                            const shortLink = `${host}/${item.shorturl}`;

                            return (
                                <div
                                    key={item._id}
                                    className="p-4 sm:p-5 rounded-xl 
                  border border-gray-200 dark:border-gray-800 
                  bg-white dark:bg-[#020617] 
                  shadow-sm hover:shadow-lg dark:hover:shadow-purple-900/20 
                  transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                >
                                    {/* LEFT */}
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                                            {item.url}
                                        </p>

                                        <a
                                            href={shortLink}
                                            target="_blank"
                                            className="text-purple-600 dark:text-purple-400 font-medium break-all hover:underline"
                                        >
                                            {shortLink}
                                        </a>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() => copyToClipboard(shortLink)}
                                            className="px-3 py-1.5 text-sm 
                      bg-linear-to-r from-purple-500 to-indigo-500 
                      hover:opacity-90 text-white rounded-lg transition"
                                        >
                                            Copy
                                        </button>

                                        <a
                                            href={shortLink}
                                            target="_blank"
                                            className="px-3 py-1.5 text-sm 
                      border border-purple-500 text-purple-600 
                      dark:text-purple-400 dark:border-purple-400 
                      rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
                                        >
                                            Visit
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
} 