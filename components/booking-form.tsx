"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { days, trainings, sessions, getTraining } from "@/lib/content";
import {
  completeDemo,
  validateEnquiry,
  type BookingEnquiry,
  type BookingErrors,
  type ContactMethod,
} from "@/lib/booking";
import { Arrow } from "./ui";

export function BookingForm() {
  const params = useSearchParams();
  const initialSession = sessions.find((s) => s.id === params.get("session"));
  const initialTraining =
    initialSession?.training ??
    getTraining(params.get("training") ?? "")?.id ??
    "unsure";
  const [value, setValue] = useState<BookingEnquiry>({
    name: "",
    contactMethod: "email",
    contact: "",
    training: initialTraining,
    preference: initialSession?.id ?? "",
    note: "",
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "complete"
  >("idle");
  const [failure, setFailure] = useState("");
  const [previewError, setPreviewError] = useState(
    params.get("preview") === "error",
  );
  const summary = useRef<HTMLDivElement>(null),
    complete = useRef<HTMLHeadingElement>(null);
  const currentSession = sessions.find((s) => s.id === value.preference);
  useEffect(() => {
    if (status === "complete") complete.current?.focus();
  }, [status]);

  const change = <K extends keyof BookingEnquiry>(
    key: K,
    next: BookingEnquiry[K],
  ) => {
    setValue((v) => ({ ...v, [key]: next }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  function changeTraining(next: BookingEnquiry["training"]) {
    setValue((v) => ({
      ...v,
      training: next,
      preference:
        currentSession && currentSession.training !== next ? "" : v.preference,
    }));
  }
  function changePreference(preference: string) {
    const selected = sessions.find((s) => s.id === preference);
    setValue((v) => ({
      ...v,
      preference,
      training: selected?.training ?? v.training,
    }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const nextErrors = validateEnquiry(value);
    setErrors(nextErrors);
    setFailure("");
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setStatus("loading");
    try {
      await completeDemo(previewError);
      setValue({
        name: "",
        contactMethod: "email",
        contact: "",
        training: "unsure",
        preference: "",
        note: "",
      });
      setStatus("complete");
    } catch (error) {
      setFailure(
        error instanceof Error
          ? error.message
          : "The demo could not finish. No information was sent. Please try again.",
      );
      setPreviewError(false);
      setStatus("error");
      requestAnimationFrame(() => summary.current?.focus());
    }
  }
  const errorFor = (field: keyof BookingEnquiry) =>
    errors[field] ? (
      <span id={`${field}-error`} className="field-error">
        {errors[field]}
      </span>
    ) : null;

  if (status === "complete")
    return (
      <div className="booking-complete">
        <span className="completion-mark" aria-hidden="true">
          ✓
        </span>
        <span className="mono red">YOUR FIRST STEP / EXPLORED</span>
        <h2 ref={complete} tabIndex={-1}>
          Demo complete.
          <br />
          No booking request was sent.
        </h2>
        <p>
          You’ve reached the end of this portfolio demo. Your entries have been
          cleared and haven’t been sent or saved.
        </p>
        <div className="completion-note">
          <span className="mono">WHAT WOULD HAPPEN NEXT?</span>
          <p>
            At a real club, the team would contact you to agree on a session.
            Only their confirmation would secure your booking.
          </p>
        </div>
        <Link href="/" className="button">
          Back to the club <Arrow />
        </Link>
        <button
          className="text-link"
          onClick={() => {
            setStatus("idle");
            requestAnimationFrame(() =>
              document.getElementById("name")?.focus(),
            );
          }}
        >
          Explore the demo again <Arrow />
        </button>
      </div>
    );

  return (
    <form
      onSubmit={submit}
      noValidate
      className="booking-form"
      aria-busy={status === "loading"}
    >
      <div className="demo-banner">
        <span className="mono">PORTFOLIO DEMO</span>
        <p>
          Explore the enquiry. No request will be sent.
          <br />
          Use sample details to try it out.
        </p>
      </div>
      {params.get("preview") === "error" && (
        <p className="preview-note mono">
          ERROR STATE PREVIEW · FIRST VALID ATTEMPT WILL SHOW A DEMO ERROR.
        </p>
      )}
      {(Object.values(errors).some(Boolean) || failure) && (
        <div
          className="form-error-summary"
          tabIndex={-1}
          ref={summary}
          role="alert"
        >
          <h3>
            {failure
              ? "The demo needs another try."
              : "A couple of details need a look."}
          </h3>
          {failure ? (
            <p>{failure}</p>
          ) : (
            <ul>
              {Object.entries(errors)
                .filter(([, message]) => message)
                .map(([field, message]) => (
                  <li key={field}>
                    <a href={`#${field}`}>{message}</a>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
      <fieldset disabled={status === "loading"}>
        <legend>
          <span className="mono red">01 /</span> A little about you
        </legend>
        <div className="field">
          <label htmlFor="name">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            autoComplete="name"
            id="name"
            name="name"
            required
            maxLength={80}
            value={value.name}
            onChange={(e) => change("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errorFor("name")}
        </div>
        <div className="field">
          <fieldset className="contact-choice">
            <legend>
              How would you like us to get in touch?{" "}
              <span aria-hidden="true">*</span>
            </legend>
            <div className="contact-options">
              {(["email", "whatsapp", "phone"] as ContactMethod[]).map(
                (method) => (
                  <label
                    key={method}
                    className={value.contactMethod === method ? "checked" : ""}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={value.contactMethod === method}
                      onChange={() => {
                        setValue((v) => ({
                          ...v,
                          contactMethod: method,
                          contact: "",
                        }));
                        setErrors((e) => ({ ...e, contact: undefined }));
                      }}
                    />
                    <span>
                      {method === "email"
                        ? "Email"
                        : method === "whatsapp"
                          ? "WhatsApp"
                          : "Phone call"}
                    </span>
                  </label>
                ),
              )}
            </div>
          </fieldset>
        </div>
        <div className="field">
          <label htmlFor="contact">
            {value.contactMethod === "email"
              ? "Email address"
              : value.contactMethod === "whatsapp"
                ? "WhatsApp number"
                : "Phone number"}{" "}
            <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact"
            name="contact"
            type={value.contactMethod === "email" ? "email" : "tel"}
            autoComplete={value.contactMethod === "email" ? "email" : "tel"}
            maxLength={120}
            required
            value={value.contact}
            onChange={(e) => change("contact", e.target.value)}
            aria-invalid={!!errors.contact}
            aria-describedby={`contact-hint${errors.contact ? " contact-error" : ""}`}
          />
          <span className="field-hint" id="contact-hint">
            {value.contactMethod === "email"
              ? "For this demo, try hello@example.com."
              : "Include your country code, for example +91."}
          </span>
          {errorFor("contact")}
        </div>
      </fieldset>
      <fieldset disabled={status === "loading"}>
        <legend>
          <span className="mono red">02 /</span> Your starting point
        </legend>
        <div className="field">
          <label htmlFor="training">
            Preferred training <span aria-hidden="true">*</span>
          </label>
          <select
            id="training"
            name="training"
            value={value.training}
            onChange={(e) =>
              changeTraining(e.target.value as BookingEnquiry["training"])
            }
            aria-invalid={!!errors.training}
            aria-describedby={errors.training ? "training-error" : undefined}
          >
            <option value="unsure">Help me choose</option>
            {trainings.map((t) => (
              <option value={t.id} key={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          {errorFor("training")}
        </div>
        <div className="field">
          <label htmlFor="preference">Preferred day or session</label>
          <select
            id="preference"
            name="preference"
            value={value.preference}
            onChange={(e) => changePreference(e.target.value)}
            aria-describedby="preference-hint"
          >
            <option value="">I’m flexible — help me find a time</option>
            <optgroup label="A preferred day">
              {days
                .filter((d) => d !== "Sunday")
                .map((d) => (
                  <option value={`day-${d}`} key={d}>
                    {d}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Illustrative sessions">
              {sessions
                .filter(
                  (s) =>
                    value.training === "unsure" ||
                    s.training === value.training,
                )
                .map((s) => (
                  <option value={s.id} key={s.id}>
                    {s.day} · {s.time} · {getTraining(s.training)?.title}
                  </option>
                ))}
            </optgroup>
          </select>
          <span className="field-hint" id="preference-hint">
            A preference, not a reservation. Times are IST.
          </span>
        </div>
        {currentSession && (
          <div className="selected-session">
            <span className="mono red">FROM YOUR TIMETABLE</span>
            <p>
              {getTraining(currentSession.training)?.title}
              <br />
              {currentSession.day} · {currentSession.time} IST ·{" "}
              {getTraining(currentSession.training)?.duration} min
            </p>
            <span>With {currentSession.coach} · Illustrative session</span>
          </div>
        )}
        <div className="field">
          <label htmlFor="note">
            Anything you’d like us to know?{" "}
            <span className="optional">Optional</span>
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            maxLength={500}
            value={value.note}
            onChange={(e) => change("note", e.target.value)}
            aria-invalid={!!errors.note}
            aria-describedby={`note-hint${errors.note ? " note-error" : ""}`}
          />
          <span className="field-hint" id="note-hint">
            A goal or a question is plenty. Please avoid sensitive or medical
            details. {value.note.length}/500
          </span>
          {errorFor("note")}
        </div>
      </fieldset>
      <p className="privacy-note">
        <span aria-hidden="true">↳</span> Your entries stay in this page’s
        memory and are cleared on completion. This demo has no booking service,
        analytics, or contact-data storage. A real enquiry would require a reply
        from the club before it is confirmed.
      </p>
      <button
        className="button booking-submit"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading"
          ? "Completing the demo…"
          : "Try the booking enquiry"}
        <Arrow />
      </button>
      <p className="submit-footnote mono" role="status">
        {status === "loading"
          ? "DEMO ONLY · NOTHING IS BEING SENT"
          : "DEMO ONLY / NO BOOKING REQUEST WILL BE SENT"}
      </p>
    </form>
  );
}
