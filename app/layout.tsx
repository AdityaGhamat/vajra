import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Wordmark } from "@/components/ui";
import Link from "next/link";
import "./globals.css";

const display = localFont({
  src: "../public/fonts/barlow-condensed-latin-700-normal.woff2",
  variable: "--font-display",
  weight: "700",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "../public/fonts/dm-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../public/fonts/dm-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://form-strength-club-pune.lightmap1025.chatgpt.site",
  ),
  title: {
    default: "FORM / Strength Club — Progress is a practice.",
    template: "%s / FORM Strength Club",
  },
  description:
    "Strength training, thoughtful coaching, and a place to keep showing up. Explore FORM, a fictional neighbourhood strength club in Pune.",
  openGraph: {
    title: "FORM / Strength Club",
    description:
      "Progress is a practice. A fictional neighbourhood strength club in Pune.",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "FORM Strength Club. Progress is a practice. Portfolio concept.",
      },
    ],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/social.png"] },
  robots: { index: false, follow: true },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f1eee6",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <footer className="footer section-pad">
          <div className="footer-top">
            <Wordmark />
            <p>
              A little stronger.
              <br />A little more often.
            </p>
            <Link href="/#visit" className="text-link">
              Visit & FAQs <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="footer-bottom">
            <p>
              FORM is a fictional portfolio concept. Images are AI-generated.
              <br />
              No operating gym, real staff, or live bookings.
            </p>
            <div className="mono">
              <span>PUNE, INDIA</span>
              <span>PROGRESS IS A PRACTICE.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
