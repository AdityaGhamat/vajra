import Image from "next/image";
import { club } from "@/lib/content";
import { Arrow } from "./ui";

/** Concept addresses are explicit; a neighbourhood link never pretends to be a venue pin. */
export function ClubLocation() {
  const { arrival } = club;
  const ready = Boolean(arrival.address);
  const live = ready && !arrival.isConcept;
  return (
    <div className="club-location">
      <div className="club-location-photo">
        <Image
          src="/images/space.webp"
          alt="Generated concept of the training floor; not a photograph of an operating venue."
          fill
          sizes="(max-width:760px) 85vw, 550px"
        />
        <span className="mono">
          {live ? "THE SPACE / YOUR NEXT STOP" : "THE SPACE / CONCEPT STUDY"}
        </span>
      </div>
      <div className="club-arrival">
        <span className="mono">FIND THE CLUB ↗</span>
        <h3>{ready ? club.location : "A neighbourhood. A future home."}</h3>
        {ready ? (
          <>
            {arrival.isConcept && (
              <p className="club-location-status mono">
                ILLUSTRATIVE ADDRESS / NOT A REAL VENUE
              </p>
            )}
            <address>{arrival.address}</address>
            <dl>
              {(
                [
                  ["LANDMARK", arrival.landmark],
                  ["ENTRANCE", arrival.entrance],
                  ["PARKING", arrival.parking],
                ] as const
              ).map(
                ([label, value]) =>
                  value && (
                    <div key={label}>
                      <dt className="mono">{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ),
              )}
            </dl>
            {arrival.mapUrl && (
              <a
                className="text-link"
                href={arrival.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {arrival.isConcept ? "Explore Baner on Maps" : "Get directions"}{" "}
                <Arrow />
              </a>
            )}
            {arrival.isConcept && (
              <p className="club-arrival-note">
                Opens the neighbourhood only. The address, landmark, entrance,
                and parking details above are fictional.
              </p>
            )}
          </>
        ) : (
          <>
            <p>
              Imagined in Baner, Pune. VAJRA is currently a portfolio concept,
              with no operating address.
            </p>
            <p className="club-arrival-note">
              A verified map pin, entrance landmark, and parking details will
              appear here when a real location is confirmed.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
