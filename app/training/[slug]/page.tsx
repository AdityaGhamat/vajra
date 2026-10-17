import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { trainings, bookingUrl } from "@/lib/content";
import { Arrow, BookLink, SectionLabel } from "@/components/ui";

export function generateStaticParams() {
  return trainings.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = trainings.find((t) => t.slug === slug);
  return { title: t?.title ?? "Training", description: t?.description };
}
export default async function TrainingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = trainings.find((t) => t.slug === slug);
  if (!t) notFound();
  return (
    <main id="main" className="training-page">
      <section className="detail-hero section-pad">
        <Link className="back-link mono" href="/#training">
          ← THE TRAINING INDEX
        </Link>
        <div className="detail-hero-grid">
          <div>
            <SectionLabel number={t.number}>
              THE PRACTICE / {t.duration} MINUTES
            </SectionLabel>
            <h1>
              {t.title.toUpperCase()}
              <span className="red">.</span>
            </h1>
            <p className="detail-line">{t.line}</p>
            <p className="detail-description">{t.description}</p>
            <BookLink href={bookingUrl(t.id)} />
            <p className="detail-reassurance mono">
              YOUR FIRST SESSION IS A STARTING POINT, NOT A TEST.
            </p>
          </div>
          <div className="detail-photo">
            <Image
              src={t.image}
              alt={t.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <span className="photo-note mono">TRAINING STUDY / {t.number}</span>
          </div>
        </div>
      </section>
      <section className="detail-overview section-pad">
        <div>
          <span className="mono red">A GOOD FIT FOR</span>
          <h2>{t.suits}</h2>
        </div>
        <div>
          <span className="mono">THE FORMAT</span>
          <p>
            {t.format}
            <br />
            {t.duration} minutes per session
          </p>
          <span className="mono">YOUR STARTING POINT</span>
          <p>{t.experience}</p>
        </div>
      </section>
      <section className="detail-session section-pad section-space">
        <SectionLabel number="—">INSIDE A SESSION</SectionLabel>
        <div className="section-heading">
          <h2>
            A CLEAR PLAN.
            <br />
            ROOM TO LEARN.
          </h2>
          <p>{t.approach}</p>
        </div>
        <ol className="session-outline">
          {t.session.map((step, i) => (
            <li key={step.title}>
              <span className="mono red">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
              <span className="mono">{step.time}</span>
            </li>
          ))}
        </ol>
        <p className="muted sample-session-note">
          Illustrative session structure. Your coach would adapt exercises and
          timing to your starting point.
        </p>
      </section>
      <section className="detail-next section-pad">
        <div>
          <span className="mono">MAKE YOUR FIRST ENTRY</span>
          <h2>
            LET’S FIND
            <br />
            YOUR STARTING POINT.
          </h2>
          <p>
            Comfortable clothes. Water. A little curiosity.
            <br />
            You don’t need to arrive with a plan.
          </p>
        </div>
        <div>
          <BookLink href={bookingUrl(t.id)} />
          <Link className="text-link" href="/#timetable">
            View the timetable <Arrow />
          </Link>
        </div>
      </section>
      <section className="other-training section-pad">
        <span className="mono">OTHER WAYS TO PRACTISE</span>
        {trainings
          .filter((other) => other.id !== t.id)
          .map((other) => (
            <Link href={`/training/${other.slug}/`} key={other.id}>
              <span className="mono">{other.number}</span>
              <h3>{other.title}</h3>
              <Arrow diagonal />
            </Link>
          ))}
      </section>
    </main>
  );
}
