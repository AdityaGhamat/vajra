export type TrainingId = "strength" | "conditioning" | "personal";
export type Training = {
  id: TrainingId;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  line: string;
  description: string;
  suits: string;
  duration: number;
  format: string;
  image: string;
  alt: string;
  approach: string;
  experience: string;
  session: { title: string; detail: string; time: string }[];
};

export const trainings: Training[] = [
  {
    id: "strength",
    slug: "coached-strength",
    number: "01",
    title: "Coached strength",
    shortTitle: "Strength",
    line: "Build a foundation. Then build on it.",
    description:
      "Learn the lifts, find your starting point, and get stronger with a coach who knows your name. A structured programme, with room for your own pace.",
    suits: "Beginners, returning lifters, and anyone who likes a plan.",
    duration: 60,
    format: "Small group · Individual guidance",
    image: "/images/strength.webp",
    alt: "Concept image: a coach observes a woman practising a kettlebell deadlift in a sunlit gym.",
    approach:
      "Your coach demonstrates each movement, helps you choose a manageable weight, and checks your technique throughout. Everyone follows the same session structure, with individual adjustments.",
    experience:
      "No lifting experience needed. We start with how you move today.",
    session: [
      {
        title: "Arrive & warm up",
        time: "10 MIN",
        detail:
          "Check in with your coach and prepare with simple mobility and movement practice.",
      },
      {
        title: "Practise the main lifts",
        time: "35 MIN",
        detail:
          "Work through squat, hinge, push, or pull patterns. Build confidence before adding weight.",
      },
      {
        title: "Finish & make a note",
        time: "15 MIN",
        detail:
          "A short supporting exercise block, a cool-down, and a note in your training log.",
      },
    ],
  },
  {
    id: "conditioning",
    slug: "small-group-conditioning",
    number: "02",
    title: "Small-group conditioning",
    shortTitle: "Conditioning",
    line: "A little more energy for everything else.",
    description:
      "Carries, simple circuits, and steady effort. Build your fitness alongside a small group, with a coach helping you find a pace you can sustain.",
    suits: "People who enjoy variety, shared energy, and a shorter session.",
    duration: 45,
    format: "Small group · Scalable effort",
    image: "/images/conditioning.webp",
    alt: "Concept image: adults practise step-ups and kettlebell carries with a coach nearby.",
    approach:
      "A coach explains the circuit and offers alternatives for every movement. Work and rest intervals keep the session clear. Your effort is personal; there is no leaderboard.",
    experience:
      "All experience levels. Movements and pace are adjusted with your coach.",
    session: [
      {
        title: "Get moving",
        time: "10 MIN",
        detail: "A gradual warm-up and a walkthrough of the day’s movements.",
      },
      {
        title: "Find your pace",
        time: "25 MIN",
        detail:
          "Simple circuits with carries, step-ups, and controlled bodyweight movements. Rest is part of the plan.",
      },
      {
        title: "Bring it back down",
        time: "10 MIN",
        detail:
          "Easy movement, a cool-down, and a quick check-in before you head out.",
      },
    ],
  },
  {
    id: "personal",
    slug: "personal-training",
    number: "03",
    title: "Personal training",
    shortTitle: "Personal training",
    line: "Your goals. Your pace. Your coach.",
    description:
      "Dedicated one-to-one time to learn, rebuild a routine, or work towards a specific training goal. A plan shaped around your starting point and your week.",
    suits:
      "Anyone who prefers privacy, flexible scheduling, or more focused guidance.",
    duration: 60,
    format: "One to one · A personal programme",
    image: "/images/coaching.webp",
    alt: "Concept image: a coach and a trainee discuss a paper training journal on a gym bench.",
    approach:
      "One coach plans and guides your session from start to finish. Together you review your training notes and adjust the programme as your confidence and capacity develop.",
    experience:
      "Start from any level. Coaching is for training, and is not medical care or rehabilitation.",
    session: [
      {
        title: "Talk & prepare",
        time: "10 MIN",
        detail:
          "Discuss how you’re feeling, review your last session, and warm up for today.",
      },
      {
        title: "Train with a purpose",
        time: "40 MIN",
        detail:
          "Follow your individual programme with close technique guidance and time to ask questions.",
      },
      {
        title: "Review & look ahead",
        time: "10 MIN",
        detail:
          "Record the session and agree on the next practical step in your routine.",
      },
    ],
  },
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
export type Day = (typeof days)[number];
/** Exercise examples describe the sample session, not a separate booking type. */
export const sessionFocuses = {
  legs: {
    label: "Legs & foundations",
    exercises: ["Goblet squats", "Reverse lunges", "Calf raises"],
    image: "/images/session-legs.webp",
  },
  upper: {
    label: "Upper body & posture",
    exercises: ["Dumbbell presses", "Supported rows", "Farmer carries"],
    image: "/images/session-upper.webp",
  },
  full: {
    label: "Full-body strength",
    exercises: ["Kettlebell deadlifts", "Squats", "Rows"],
    image: "/images/strength.webp",
  },
  circuit: {
    label: "Conditioning & core",
    exercises: ["Step-ups", "Loaded carries", "Dead bugs"],
    image: "/images/conditioning.webp",
  },
  personal: {
    label: "Your individual programme",
    exercises: ["Split squats", "Presses & pulls", "Core stability"],
    image: "/images/coach-meera.webp",
  },
} as const;
export type SessionFocusId = keyof typeof sessionFocuses;

export type Session = {
  id: string;
  day: Day;
  time: string;
  training: TrainingId;
  focus: SessionFocusId;
  coach: string;
  level: string;
};
export const sessions: Session[] = [
  {
    id: "mon-0700",
    day: "Monday",
    time: "07:00",
    training: "strength",
    focus: "legs",
    coach: "Arjun",
    level: "All levels",
  },
  {
    id: "mon-1230",
    day: "Monday",
    time: "12:30",
    training: "personal",
    focus: "personal",
    coach: "Meera",
    level: "Individual",
  },
  {
    id: "mon-1800",
    day: "Monday",
    time: "18:00",
    training: "conditioning",
    focus: "circuit",
    coach: "Meera",
    level: "All levels",
  },
  {
    id: "mon-1900",
    day: "Monday",
    time: "19:00",
    training: "strength",
    focus: "upper",
    coach: "Arjun",
    level: "All levels",
  },
  {
    id: "tue-0700",
    day: "Tuesday",
    time: "07:00",
    training: "conditioning",
    focus: "circuit",
    coach: "Meera",
    level: "All levels",
  },
  {
    id: "tue-0800",
    day: "Tuesday",
    time: "08:00",
    training: "strength",
    focus: "full",
    coach: "Arjun",
    level: "Foundations",
  },
  {
    id: "tue-1800",
    day: "Tuesday",
    time: "18:00",
    training: "strength",
    focus: "legs",
    coach: "Meera",
    level: "All levels",
  },
  {
    id: "wed-0700",
    day: "Wednesday",
    time: "07:00",
    training: "strength",
    focus: "upper",
    coach: "Arjun",
    level: "All levels",
  },
  {
    id: "wed-1230",
    day: "Wednesday",
    time: "12:30",
    training: "personal",
    focus: "personal",
    coach: "Meera",
    level: "Individual",
  },
  {
    id: "wed-1800",
    day: "Wednesday",
    time: "18:00",
    training: "conditioning",
    focus: "circuit",
    coach: "Meera",
    level: "All levels",
  },
  {
    id: "thu-0800",
    day: "Thursday",
    time: "08:00",
    training: "strength",
    focus: "legs",
    coach: "Arjun",
    level: "Foundations",
  },
  {
    id: "thu-1800",
    day: "Thursday",
    time: "18:00",
    training: "conditioning",
    focus: "circuit",
    coach: "Meera",
    level: "All levels",
  },
  {
    id: "thu-1900",
    day: "Thursday",
    time: "19:00",
    training: "personal",
    focus: "personal",
    coach: "Arjun",
    level: "Individual",
  },
  {
    id: "fri-0700",
    day: "Friday",
    time: "07:00",
    training: "strength",
    focus: "full",
    coach: "Arjun",
    level: "All levels",
  },
  {
    id: "fri-1800",
    day: "Friday",
    time: "18:00",
    training: "conditioning",
    focus: "circuit",
    coach: "Meera",
    level: "All levels",
  },
  {
    id: "sat-0800",
    day: "Saturday",
    time: "08:00",
    training: "strength",
    focus: "legs",
    coach: "Arjun",
    level: "Foundations",
  },
  {
    id: "sat-0900",
    day: "Saturday",
    time: "09:00",
    training: "conditioning",
    focus: "circuit",
    coach: "Meera",
    level: "All levels",
  },
];
export const getTraining = (id: string) => trainings.find((t) => t.id === id);
export function bookingUrl(training?: TrainingId, session?: string) {
  const params = new URLSearchParams();
  if (training) params.set("training", training);
  if (session) params.set("session", session);
  return `/book/${params.size ? `?${params}` : ""}`;
}

export const memberships = [
  {
    number: "01",
    name: "Open training",
    price: "2,500",
    description: "A space for your own practice.",
    included: [
      "Training floor during opening hours",
      "Equipment orientation on joining",
      "Your own independent programme",
    ],
    coaching: "Orientation only; coached sessions excluded.",
  },
  {
    number: "02",
    name: "Coached membership",
    price: "5,500",
    description: "A plan. A coach. A steady rhythm.",
    included: [
      "12 coached group sessions per month",
      "Strength & conditioning sessions",
      "Open training access included",
    ],
    coaching:
      "Technique guidance in every group session; one-to-one sessions excluded.",
  },
  {
    number: "03",
    name: "Personal coaching",
    price: "12,000",
    description: "Focused time, built around you.",
    included: [
      "8 one-to-one sessions per month",
      "An individual training programme",
      "Open training access included",
    ],
    coaching: "A dedicated coach; group sessions excluded.",
  },
];

export const coaches = [
  {
    name: "Arjun",
    role: "Strength & foundations",
    image: "/images/coach-arjun.webp",
    position: "45% center",
    text: "Patient explanations. Small adjustments. Arjun’s illustrative approach is to make the weight room feel familiar, one movement at a time.",
    helps: "Starting out or returning after a break.",
  },
  {
    name: "Meera",
    role: "Conditioning & personal training",
    image: "/images/coach-meera.webp",
    position: "45% center",
    text: "A clear plan and a thoughtful pace. Meera’s illustrative approach makes room for questions, different starting points, and the rest of your life.",
    helps: "Building a routine that fits a busy week.",
  },
];

export const faqs = [
  {
    question: "I’ve never trained before. Is this for me?",
    answer:
      "Yes. Your first session starts with a conversation and simple, guided movements. You do not need to know the exercises or reach a certain fitness level before coming in. We will suggest a suitable starting point together.",
  },
  {
    question: "What should I bring?",
    answer:
      "Comfortable clothes you can move in, clean training shoes, a water bottle, and a small towel. Arrive about 10 minutes early so you have time to settle in. You do not need special equipment.",
  },
  {
    question: "What happens after I request a session?",
    answer:
      "In a real club, the team would contact you using your chosen method to agree on a time. A request is not a confirmed booking. This portfolio demo sends nothing and finishes with a clear demo-complete message.",
  },
  {
    question: "Can I change or cancel a session?",
    answer:
      "Sample policy: let the team know at least 12 hours before a confirmed session to reschedule without using a session credit. Late cancellations would count towards the monthly session allowance. This is an illustrative policy, not a live service.",
  },
  {
    question: "Do I need to commit for a year?",
    answer:
      "No. The sample memberships run month to month, with no joining fee or annual contract. Unused sessions do not roll over. Request cancellation before your next billing date. Production terms would be agreed with the club.",
  },
  {
    question: "Where is VAJRA FITNESS, and how do I contact you?",
    answer:
      "VAJRA FITNESS is a fictional club set in Baner, Pune. The sample street address and arrival details are invented for this portfolio. The map link opens the Baner neighbourhood only, not a real gym. No operating venue or phone number is provided.",
  },
];

export const club = {
  location: "Baner, Pune",
  // Invented portfolio address. Keep isConcept true until every arrival detail is verified.
  arrival: {
    isConcept: true,
    address:
      "Studio 02, VAJRA House, Practice Lane, Baner, Pune, Maharashtra" as
        string | null,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Baner%2C%20Pune" as
        string | null,
    landmark:
      "Sample landmark: the olive courtyard, beside the studio entrance." as
        string | null,
    entrance: "Sample access: second floor, via the courtyard staircase." as
      string | null,
    parking:
      "Sample provision: cycle and two-wheeler spaces in the courtyard. Car parking to be confirmed." as
        string | null,
  },
  hours: [
    { days: "Monday – Friday", time: "06:00 – 21:00" },
    { days: "Saturday", time: "07:00 – 14:00" },
    { days: "Sunday", time: "Closed · Rest is practice, too." },
  ],
};
