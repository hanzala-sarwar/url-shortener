
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/components/ReduxProvider";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar/Navbar";


export const metadata = {
  title: {
    default: "BitLinks - Modern URL Shortener",
    template: "%s | BitLinks",
  },

  description:
    "BitLinks is a fast and modern URL shortener built with Next.js. Create short links, manage URLs, and share links easily.",

  keywords: [
    "URL shortener",
    "link shortener",
    "short links",
    "Next.js",
    "BitLinks",
  ],

  authors: [{ name: "Hanzala" }],
  creator: "Hanzala",

  metadataBase: new URL(
    "https://url-shortener-henna-three.vercel.app"
  ),

  openGraph: {
    title: "BitLinks - Modern URL Shortener",
    description:
      "Create and manage short links instantly with BitLinks.",
    url: "https://url-shortener-henna-three.vercel.app",
    siteName: "BitLinks",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BitLinks Preview Image",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BitLinks - Modern URL Shortener",
    description:
      "Create and manage short links instantly with BitLinks.",

    images: ["/twitter-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <Toaster />
            <Navbar />
            {children}

          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
