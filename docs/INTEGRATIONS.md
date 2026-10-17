# Demo and production integration points

## Booking adapter

`lib/booking.ts` defines `BookingEnquiry`, `BookingErrors`, `validateEnquiry`, and `completeDemo`. The latter deliberately accepts **no enquiry payload**; it cannot send the visitor's personal entries anywhere. The 450ms asynchronous step makes loading feedback reviewable. The explicit `preview=error` query exercises retry without contacting a service.

For a real gym, replace the call to `completeDemo` in `components/booking-form.tsx` with a server-side enquiry adapter that accepts the validated payload. Revalidate on the server. Return a typed result distinguishing `requested`, `confirmed`, and `failed`; a successful enquiry must not be worded as a confirmed reservation. Keep the client's entries available for correction/retry when sending fails. Use the selected stable session ID to look up authoritative schedule data server-side.

The current app exports static files. To add a Next.js Route Handler such as `app/api/enquiries/route.ts`, use an appropriate Next.js server host and remove `output: 'export'`. Alternatively keep static hosting and connect an approved external booking service. Set credentials only in the hosting service's server environment.

Decide with the actual club: ownership and storage of enquiries, retention, visitor consent/privacy copy, contact channels, expected response time, spam protection, cancellation terms, and confirmation responsibility. The current form has no medical intake or payment collection.

## Schedule and content

Replace the illustrative arrays in `lib/content.ts` with verified club content or a typed CMS/booking data source. Keep programme IDs stable. Ensure offered sessions, opening hours, programme durations, and included membership credits agree. There are deliberately no capacity, availability, or urgency counters. If live capacity is later shown, source it from authoritative booking data.

## Contact and location

The visit section and corresponding FAQ explicitly identify Baner, Pune as a fictional setting. No actual address, phone, email, WhatsApp, or map pin has been invented. After verification, wire `club` content to real contact links and add a directions link with a real destination. Review step-free access and changing facilities with the gym before making claims.

## Photography and coach profiles

The current images and names are concept material. Replace with a coherent commissioned shoot and approved staff biographies. Obtain releases and verify any qualifications before publishing them. See ASSETS.md for shot requirements and exact prompts used for this version.

## Real reviews and measurement

There is no testimonial or review component filled with invented people. The philosophy section can later accept an attributed quote block with permission and source details. Do not replace coaching principles with anonymous success claims.

There are no analytics scripts. If measurement is added, define a consent-compatible first-session enquiry event and distinguish enquiry from confirmation. Gather actual mobile field Core Web Vitals after launch and validate with users; no performance, membership, or conversion improvement is claimed by this portfolio concept.

## Search and metadata

The layout has a site origin, page titles/descriptions, a 1200×630 social image, and a favicon. `robots` currently requests no indexing because this is fictional. A real launch should update the origin, descriptions, indexing policy, and verified contact details. No LocalBusiness structured data is included.
