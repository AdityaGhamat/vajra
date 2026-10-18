import Image from "next/image";
import strengthHero from "@/public/images/strength.webp";
import { TransitionLink as Link } from "@/components/page-transitions";
import { Arrow, BookLink, SectionLabel, Closing } from "@/components/ui";
import { TrainingIndex } from "@/components/training-index";
import { Timetable } from "@/components/timetable";
import { Journal } from "@/components/journal";
import { Interstitial } from "@/components/interstitial";
import { SpaceGallery } from "@/components/space-gallery";
import { ImageAction } from "@/components/image-action";
import { memberships, coaches, faqs, club } from "@/lib/content";

export default function Home() {
  return (
    <main id="main">
      <Journal />
      <section
        className="hero section-pad chapter-iron"
        aria-labelledby="hero-title"
      >
        <div className="hero-meta mono hero-log-meta">
          <span>
            <span className="location-mark">↗</span> YOUR NEIGHBOURHOOD. YOUR
            NEXT CHAPTER.
          </span>
          <span>BANER, PUNE / INDIA</span>
          <span className="hero-stamp">ENTRY 001 — SHOW UP</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="display-mega display-wrap">
              <span className="display-ghost" aria-hidden="true">
                PROGRESS IS
                <br />A PRACTICE.
              </span>
              <span className="display-solid">
                PROGRESS IS
                <br />A PRACTICE<span className="red">.</span>
              </span>
            </h1>
            <div className="hero-description">
              <span className="red mono hero-plus">+</span>
              <p>
                Strength training, thoughtful coaching,
                <br className="desktop-break" /> and a place to keep showing up.
                Show up. Log it. Repeat.
              </p>
            </div>
            <div className="hero-actions">
              <BookLink />
              <Link href="#training" className="text-link">
                Explore training <Arrow diagonal />
              </Link>
            </div>
          </div>
          <figure className="hero-photo hero-chalk-wipe">
            <ImageAction
              className="photo-viewport"
              href="#begin"
              label="Discover what your first session looks like"
              cue="Your first session"
            >
              <Image
                src={strengthHero}
                alt="Concept photograph: a woman practises a kettlebell deadlift while a coach watches her technique."
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 760px) 100vw, 49vw"
              />
            </ImageAction>
            <figcaption className="hero-photo-caption mono">
              THE WORK IS PERSONAL. THE PRACTICE IS SHARED.
            </figcaption>
          </figure>
        </div>
        <div className="hero-proof mono">
          <span>COACHED STRENGTH & CONDITIONING</span>
          <span>03 TRAINING FORMATS</span>
          <span>45–60 MIN SESSIONS</span>
          <span>BEGINNERS WELCOME</span>
          <a href="#begin" aria-label="Discover your first session">
            SCROLL TO BEGIN ↓
          </a>
        </div>
      </section>

      <Interstitial word="SHOW UP" subtitle="YOUR FIRST STEP" />

      <section id="begin" className="first-session section-pad section-space">
        <SectionLabel number="01">
          A PLACE TO START / <span className="stamp-in">ENTRY 002</span>
        </SectionLabel>
        <div className="first-grid">
          <div>
            <h2>
              YOU DON’T HAVE
              <br />
              TO KNOW THE WAY.
              <br />
              <span className="soft-ink">THAT’S WHY WE’RE HERE.</span>
            </h2>
            <p className="section-intro">
              Your first session is a conversation,
              <br className="desktop-break" /> not a test.
            </p>
            <p className="muted first-small">
              No experience needed. No pressure to keep up.
              <br />
              Just a starting point that feels like yours.
            </p>
            <div className="packing-note">
              <span className="mono red">A SMALL NOTE BEFORE YOU COME</span>
              <p>
                Bring comfortable clothes, clean trainers, water,
                <br className="desktop-break" /> and a towel. We’ll take care of
                the plan.
              </p>
            </div>
          </div>
          <ol className="first-steps">
            <li>
              <span className="step-number mono">01 /</span>
              <div>
                <h3>Meet your coach.</h3>
                <p>
                  Tell us about your experience, your week, and what you’d like
                  training to make possible.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number mono">02 /</span>
              <div>
                <h3>Find your starting point.</h3>
                <p>
                  Try a guided session matched to your experience. Ask
                  questions. Take your time.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number mono">03 /</span>
              <div>
                <h3>Make room for a routine.</h3>
                <p>
                  Choose a way to train that fits your life. We’ll help you work
                  out what comes next.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section id="training" className="training section-pad section-space">
        <SectionLabel number="02">FIND YOUR TRAINING</SectionLabel>
        <div className="section-heading">
          <h2>
            MORE THAN ONE
            <br />
            WAY TO GET STRONG.
          </h2>
          <p>
            Some of us start with a barbell.
            <br />
            Some start with a question.
            <br />
            There’s room for both.
          </p>
        </div>
        <TrainingIndex />
      </section>

      <section className="philosophy section-pad">
        <div className="philosophy-image">
          <Image
            src="/images/equipment.webp"
            alt="Concept photograph: a chalk-dusted hand adds a weight plate to a barbell."
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <span className="mono photo-note">
            SMALL DETAILS. LASTING HABITS.
          </span>
        </div>
        <div className="philosophy-copy">
          <span className="mono">A NOTE ON OUR APPROACH</span>
          <h2>
            THE BEST SESSION
            <br />
            IS THE ONE YOU
            <br />
            <span className="chalk-text">COME BACK TO.</span>
          </h2>
          <p>
            We believe a good coach makes training clearer. A good club makes
            showing up easier. And progress comes from the things you can keep
            doing.
          </p>
          <p>
            No performance to put on. No one else’s pace to chase. Just good
            work, done together.
          </p>
          <div className="practice-notation mono">
            <span>SHOW UP</span>
            <span>→</span>
            <span>PRACTISE</span>
            <span>→</span>
            <span>REPEAT</span>
          </div>
        </div>
      </section>

      <Interstitial word="REPEAT" subtitle="BUILD YOUR RHYTHM" />

      <section id="timetable" className="section-pad section-space">
        <SectionLabel number="03">MAKE IT A ROUTINE</SectionLabel>
        <div className="section-heading">
          <h2>
            A LITTLE SPACE
            <br />
            IN YOUR WEEK.
          </h2>
          <div>
            <p>
              Early start. Lunch break. After work.
              <br />
              Find a session that fits around you.
            </p>
            <span className="sample-label mono">
              SAMPLE WEEK / ILLUSTRATIVE SESSIONS
            </span>
          </div>
        </div>
        <Timetable />
      </section>

      <section className="coaches section-pad section-space">
        <SectionLabel number="—">THE PEOPLE BESIDE YOU</SectionLabel>
        <div className="section-heading">
          <h2>
            GOOD COACHING.
            <br />
            HUMAN CONNECTION.
          </h2>
          <p>
            Someone to explain the why.
            <br />
            Notice the small things.
            <br />
            And help you find your next step.
          </p>
        </div>
        <div className="coach-grid">
          {coaches.map((c, i) => (
            <article className="coach-profile" key={c.name}>
              <div className="coach-photo">
                <Image
                  src={c.image}
                  alt={`Generated concept scene representing ${c.name}’s coaching approach; not an actual staff portrait.`}
                  fill
                  sizes="(max-width: 760px) 100vw, 43vw"
                  style={{ objectPosition: c.position }}
                />
                <span className="mono photo-note">
                  COACHING STUDY / 0{i + 1}
                </span>
              </div>
              <div className="coach-info">
                <div>
                  <span className="mono red">ILLUSTRATIVE PROFILE</span>
                  <h3>{c.name}</h3>
                  <p className="coach-role">{c.role}</p>
                </div>
                <div>
                  <p>{c.text}</p>
                  <p className="coach-helps">
                    <span className="mono">A GOOD FIT FOR</span>
                    {c.helps}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="membership" className="membership section-pad section-space">
        <SectionLabel number="04">A COMMITMENT TO YOURSELF</SectionLabel>
        <div className="section-heading">
          <h2>
            FIND YOUR
            <br />
            KIND OF CONSISTENT.
          </h2>
          <div>
            <p>
              Clear options. Room to choose.
              <br />
              Start with a session, then decide.
            </p>
            <span className="sample-label mono">
              ILLUSTRATIVE PRICING / INR PER MONTH
            </span>
          </div>
        </div>
        <div className="membership-grid">
          {memberships.map((m, i) => (
            <article
              className={`membership-option ${i === 1 ? "membership-featured" : ""}`}
              key={m.name}
            >
              <span className="mono membership-number">
                MEMBERSHIP / {m.number}
              </span>
              <h3>{m.name}</h3>
              <p className="membership-description">{m.description}</p>
              <div className="price">
                <span className="currency">₹</span>
                {m.price}
                <span className="per-month">/ month</span>
              </div>
              <ul>
                {m.included.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="coaching-inclusion">{m.coaching}</p>
              {i === 1 ? (
                <BookLink />
              ) : (
                <Link
                  href={i === 2 ? "/book/?training=personal" : "/book/"}
                  className="text-link"
                >
                  {i === 2
                    ? "Try personal coaching"
                    : "Book your first session"}{" "}
                  <Arrow diagonal />
                </Link>
              )}
            </article>
          ))}
        </div>
        <div className="membership-terms">
          <p>
            Sample plans: month to month · No joining fee · No annual contract.
            <br />
            Session credits reset monthly and don’t roll over. Sample prices
            include applicable taxes.
          </p>
        </div>
      </section>

      <section
        id="space"
        className="space section-pad section-space space-essay chapter-iron"
      >
        <SectionLabel number="05">ROOM TO FIND YOUR RHYTHM</SectionLabel>
        <div className="section-heading">
          <h2>
            A SERIOUS SPACE.
            <br />
            AN EASY PLACE TO BE.
          </h2>
          <p>
            Useful equipment. A little breathing room.
            <br />
            Everything you need to do the work.
          </p>
        </div>
        <SpaceGallery />
      </section>

      <section id="visit" className="visit section-pad section-space">
        <SectionLabel number="06">BEFORE YOU WALK IN</SectionLabel>
        <div className="visit-grid">
          <div>
            <h2>
              YOUR NEXT
              <br />
              REGULAR PLACE.
            </h2>
            <p className="visit-location">
              {club.location}
              <span className="mono">ILLUSTRATIVE NEIGHBOURHOOD</span>
            </p>
            <p className="muted visit-intro">
              An independent club imagined for a Pune neighbourhood. The details
              below describe the concept, not an operating business.
            </p>
            <div className="hours">
              <span className="mono">SAMPLE OPENING HOURS / IST</span>
              {club.hours.map((h) => (
                <div key={h.days}>
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
            <div className="contact-note">
              <span className="mono">MAP & CONTACT</span>
              <p>
                Directions, email, and WhatsApp will be added when a real club’s
                details are verified.
              </p>
            </div>
          </div>
          <div className="faq">
            <span className="mono faq-heading">
              A FEW THINGS YOU MIGHT BE WONDERING
            </span>
            {faqs.map((f) => (
              <details key={f.question}>
                <summary>
                  {f.question}
                  <span aria-hidden="true" className="faq-plus">
                    +
                  </span>
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Closing />
    </main>
  );
}
