import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Wordmark } from "@/components/ui";
import { TransitionLink as Link } from "@/components/page-transitions";
import { MotionSystem } from "@/components/motion-system";
import { MotionToggle } from "@/components/motion-toggle";
import { PageTransitions } from "@/components/page-transitions";
import "./globals.css";
import "lenis/dist/lenis.css";
import "./experience.css";
import "./controls.css";

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
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "VAJRA FITNESS — Progress is a practice.",
    template: "%s / VAJRA FITNESS",
  },
  description:
    "Strength training, thoughtful coaching, and a place to keep showing up. Explore VAJRA FITNESS, a fictional neighbourhood strength club in Pune.",
  openGraph: {
    title: "VAJRA FITNESS",
    description:
      "Progress is a practice. A fictional neighbourhood strength club in Pune.",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "VAJRA FITNESS. Progress is a practice. Portfolio concept.",
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
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('form-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;document.documentElement.dataset.motionPreference=localStorage.getItem('form-motion')==='reduce'?'reduce':'full'}catch(e){document.documentElement.dataset.theme='light'}`,
          }}
        />
      </head>
      <body>
        <PageTransitions>
          <MotionSystem />
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
                VAJRA FITNESS is a fictional portfolio concept. Images are
                AI-generated.
                <br />
                No operating gym, real staff, or live bookings.
              </p>
              <div className="mono">
                <span>PUNE, INDIA</span>
                <span>PROGRESS IS A PRACTICE.</span>
                <MotionToggle />
              </div>
            </div>
          </footer>
        </PageTransitions>
      </body>
    </html>
  );
}
