import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-purple-50 dark:bg-[#0f172a] text-gray-800 dark:text-white transition-colors duration-300">

      {/* HERO */}
      <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          About Our URL Shortener
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          A fast, reliable, and secure way to shorten long URLs into clean,
          shareable links. Built with modern web technologies for performance
          and scalability.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10">
          Key Features
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Fast URL Shortening",
              desc: "Generate short links instantly with optimized backend performance.",
            },
            {
              title: "Secure & Reliable",
              desc: "Your data is stored safely with proper validation and security checks.",
            },
            {
              title: "Custom Short Links",
              desc: "Create personalized URLs for branding and easy sharing.",
            },
            {
              title: "Scalable Backend",
              desc: "Built using MongoDB and modern architecture for high scalability.",
            },
            {
              title: "Responsive Design",
              desc: "Works seamlessly across mobile, tablet, and desktop devices.",
            },
            {
              title: "Developer Friendly",
              desc: "Clean APIs and structured code for easy integration and extension.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 
              bg-white dark:bg-[#020617] 
              shadow-sm hover:shadow-lg dark:hover:shadow-purple-900/20 
              transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3 text-center">
          {[
            "Enter your long URL",
            "Generate a short link",
            "Share it anywhere",
          ].map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 
              bg-white dark:bg-[#020617] 
              shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {index + 1}
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10">
          Technology Stack
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Next.js",
            "React",
            "MongoDB",
            "Node.js",
            "Tailwind CSS",
            "shadcn/ui",
          ].map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full text-sm 
              border border-gray-300 dark:border-gray-700 
              bg-white dark:bg-[#020617] 
              text-gray-700 dark:text-gray-300 
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="rounded-2xl p-8 sm:p-10 
        bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg">

          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Start shortening your links today 🚀
          </h2>

          <p className="mb-6 text-sm sm:text-base text-white/90">
            Simple, fast, and powerful URL shortening at your fingertips.
          </p>

          <Link
            href="/shorten"
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
} 