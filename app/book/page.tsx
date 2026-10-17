import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/page-transitions";
import { BookingForm } from "@/components/booking-form";
export const metadata: Metadata = {
  title: "Book your first session",
  description:
    "Meet a coach. Try a session. Explore the demo enquiry for FORM Strength Club. No booking request will be sent.",
};
export default function BookPage() {
  return (
    <main id="main" className="booking-page section-pad">
      <Link className="back-link mono" href="/">
        ← BACK TO THE CLUB
      </Link>
      <div className="booking-layout">
        <div className="booking-story">
          <span className="mono red">YOUR FIRST SESSION / 01</span>
          <h1>
            YOU BRING
            <br />
            YOURSELF.
            <br />
            WE’LL BRING
            <br />
            THE PLAN<span className="red">.</span>
          </h1>
          <p>
            Meet a coach. Try a session.
            <br />
            Find your rhythm.
          </p>
          <div className="booking-photo">
            <Image
              src="/images/coaching.webp"
              alt="Generated concept: a coach and trainee look over a training journal together."
              fill
              sizes="(max-width: 760px) 100vw, 40vw"
            />
          </div>
          <div className="booking-story-note mono">
            <span>NO EXPERIENCE NEEDED.</span>
            <span>BEGINNERS WELCOME.</span>
            <span>A REQUEST, NOT A RESERVATION.</span>
          </div>
        </div>
        <div className="booking-form-wrap">
          <Suspense fallback={<p role="status">Preparing the demo enquiry…</p>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
