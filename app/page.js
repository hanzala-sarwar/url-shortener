import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-purple-50 dark:bg-[#0f172a] text-gray-800 dark:text-white transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            The Best URL Shortener in the Market
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0">
            Simple, fast, and privacy-friendly URL shortening. No tracking, no
            unnecessary signups — just clean and efficient links when you need them.
          </p>

          {/* BUTTON */}
          <div className="flex justify-center lg:justify-start">
            <Link href="/shorten">
              <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition text-white px-6 py-3 rounded-lg font-semibold shadow-md w-full sm:w-auto">
                Try Now
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-72 sm:h-96 lg:h-[500px]">
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
            alt="URL Shortener Illustration"
            fill
            className="object-contain rounded-xl"
            priority
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-white dark:bg-[#020617] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Fast & Reliable",
                desc: "Generate short links instantly with high performance backend.",
              },
              {
                title: "No Tracking",
                desc: "We respect your privacy — no tracking or unnecessary data collection.",
              },
              {
                title: "Easy to Use",
                desc: "Clean interface designed for simplicity and efficiency.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 
                bg-white dark:bg-[#0f172a] 
                shadow-sm hover:shadow-lg dark:hover:shadow-purple-900/20 
                transition"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Start shortening your links today 🚀
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Fast, secure, and completely free to use.
        </p>

        <Link href="/shorten">
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition text-white px-8 py-3 rounded-lg font-semibold shadow-md">
            Get Started
          </button>
        </Link>
      </section>
    </main>
  );
} 