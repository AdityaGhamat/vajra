import { TransitionLink as Link } from "@/components/page-transitions";
export default function NotFound() {
  return (
    <main id="main" className="not-found section-pad">
      <span className="mono red">404 / A MISSED TURN</span>
      <h1>
        LET’S GET
        <br />
        BACK TO VAJRA.
      </h1>
      <p>This page isn’t part of the training plan.</p>
      <Link className="button" href="/">
        Back to the club <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
