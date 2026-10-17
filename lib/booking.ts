import type { TrainingId } from "./content";

export type ContactMethod = "email" | "phone" | "whatsapp";
export type BookingEnquiry = {
  name: string;
  contactMethod: ContactMethod;
  contact: string;
  training: TrainingId | "unsure";
  preference: string;
  note: string;
};
export type BookingErrors = Partial<Record<keyof BookingEnquiry, string>>;

export function validateEnquiry(value: BookingEnquiry): BookingErrors {
  const errors: BookingErrors = {};
  if (value.name.trim().length < 2)
    errors.name = "Please enter your name (at least 2 characters).";
  else if (value.name.trim().length > 80)
    errors.name = "Please keep your name under 80 characters.";
  if (!value.contact.trim())
    errors.contact =
      value.contactMethod === "email"
        ? "Please enter your email address."
        : "Please enter a contact number, including country code.";
  else if (
    value.contactMethod === "email" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.contact.trim())
  )
    errors.contact =
      "Please enter a valid email address, such as hello@example.com.";
  else if (
    value.contactMethod !== "email" &&
    (!/^[+\d\s().-]+$/.test(value.contact) ||
      value.contact.replace(/\D/g, "").length < 7 ||
      value.contact.replace(/\D/g, "").length > 15)
  )
    errors.contact =
      "Please enter a valid number with 7–15 digits, including country code.";
  if (
    !["strength", "conditioning", "personal", "unsure"].includes(value.training)
  )
    errors.training = "Choose a training option, or select “Help me choose”.";
  if (value.note.length > 500)
    errors.note = "Please keep your note to 500 characters.";
  return errors;
}

/** Production seam: replace with a server-side booking/CRM adapter.
 * Demo intentionally does not accept the enquiry payload, fetch, store, log,
 * email, or confirm anything. simulateError is for an explicit QA preview only.
 */
export async function completeDemo(
  simulateError = false,
): Promise<{ mode: "demo" }> {
  await new Promise((resolve) => setTimeout(resolve, 450));
  if (simulateError)
    throw new Error(
      "Demo error preview. No information was sent. Please try again.",
    );
  return { mode: "demo" };
}
