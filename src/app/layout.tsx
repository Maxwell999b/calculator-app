import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "React Calculator",
  description:
    "A modern, responsive calculator application with history tracking, keyboard support, and a clean UI. Built with Next.js and React.",
  keywords: ["calculator", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Maxwell999b" }],
  creator: "Maxwell999b",
  publisher: "React Calculator",
  metadataBase: new URL("https://your-calculator-app.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-calculator-app.vercel.app",
    title: "React Calculator - Modern Web Calculator",
    description:
      "A feature-rich calculator application with expression history, keyboard support, and a sleek dark mode interface.",
    siteName: "React Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "React Calculator - Modern Web Application",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Calculator - Modern Web Calculator",
    description: "Perform calculations with ease using our modern, feature-rich calculator web application.",
    images: ["/android-chrome-512x512.png"],
    creator: "@YourTwitterHandle",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png" },
      { url: "/favicon-16x16.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="https://your-calculator-app.vercel.app/android-chrome-512x512.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
