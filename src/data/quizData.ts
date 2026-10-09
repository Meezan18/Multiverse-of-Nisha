import type { QuizQuestion, QuizResult } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Nisha has just finished a new dark romance novel. What's her next move?",
    options: [
      "Immediately start recommending it to everyone and oversharing spoilers",
      "Casually mentions it in conversation after 3 days",
      "Never talks about it but re-reads favorite scenes 5 times",
      "Forgets about it completely",
    ],
    correctAnswer: 0,
    trait: "bookworm-chaotic",
  },
  {
    id: 2,
    question: "You're watching a horror thriller with Nisha. How does she react?",
    options: [
      "Dead silent, hiding behind a pillow, overthinking every sound after",
      "Laughing at jump scares and making them funnier",
      "Roaming around the house alone at 2 AM to 'test' the vibes",
      "Falls asleep 10 minutes in",
    ],
    correctAnswer: 0,
    trait: "horror-baby",
  },
  {
    id: 3,
    question: "Nisha just heard some juicy gossip. What's her energy?",
    options: [
      "Pretends she doesn't care but asks 47 follow-up questions",
      "Spreads it IMMEDIATELY with full cinematic narration",
      "Keeps it locked in vault-level secrecy",
      "Changes the topic awkwardly",
    ],
    correctAnswer: 1,
    trait: "gossip-queen",
  },
  {
    id: 4,
    question: "When she's in one of her mood swings, how does she communicate?",
    options: [
      "Says exactly what's on her mind, no filter",
      "Goes full 'indirectly talks' mode with cryptic one-liners",
      "Texts 'k' and goes radio silent for 6 hours",
      "Bakes something aggressively",
    ],
    correctAnswer: 1,
    trait: "rapunzel-mood",
  },
  {
    id: 5,
    question: "Doraemon or Shinchan marathon time! Pick her vibe",
    options: [
      "Shinchan unhinged energy at max volume",
      "Doraemon cozy comfort, wrapped in blanket burrito",
      "Switches between both while arguing with herself",
      "Only watches South Indian films today",
    ],
    correctAnswer: 2,
    trait: "nostalgia-chaos",
  },
  {
    id: 6,
    question: "Michelle Morrone appears on screen. Nisha's reaction?",
    options: [
      "Calmly appreciates his acting",
      "Screams internally, kicks feet, full main character delulu",
      "Critiques the plot instead",
      "Doesn't notice, reading novel subtitles",
    ],
    correctAnswer: 1,
    trait: "dark-romance-delulu",
  },
  {
    id: 7,
    question: "Nisha is overthinking for the 5th time today. Solution?",
    options: [
      "Rants for 40 minutes in the most poetic tangents ever",
      "Goes on a long walk thinking about 37 alternate timelines",
      "Pulls a Rapunzel and daydreams out the window",
      "All of the above. Absolutely all of them.",
    ],
    correctAnswer: 3,
    trait: "overthinker-promax",
  },
  {
    id: 8,
    question: "Time to argue. Nisha's go-to strategy?",
    options: [
      "Logically wins in 2 points",
      "Brings up something from 3 months ago with elite recall",
      "Argues passionately while also caring deeply 2 seconds later",
      "Refuses to argue, gives the silent treatment with ✨drama✨",
    ],
    correctAnswer: 2,
    trait: "softly-ferocious",
  },
  {
    id: 9,
    question: "Nisha's phone hits 5% at midnight. What's the real move?",
    options: [
      "Plug it in like a responsible adult (lies)",
      "Scroll reels until it dies mid-scroll",
      "Text a 3-paragraph goodnight essay",
      "Charges it, sleeps early — sleep is sacred",
    ],
    correctAnswer: 3,
    trait: "sleep-angel",
  },
  {
    id: 10,
    question: "Nisha finds a talking pigeon on the windowsill. First question?",
    options: [
      "Can you gossip?",
      "Do you spy for Meezan?",
      "Why are you judging my outfit?",
      "Can you do my horoscope?",
    ],
    correctAnswer: 0,
    trait: "tower-bird-watcher",
  },
  {
    id: 11,
    question: "Her 2 AM snack cabinet mood is…",
    options: [
      "Leftover pizza, standing at the fridge",
      "Cereal with whatever milk exists",
      "'One' chocolate that secretly becomes seven",
      "Biscuits dipped in chai, obviously",
    ],
    correctAnswer: 3,
    trait: "midnight-muncher",
  },
  {
    id: 12,
    question: "Nisha's camera roll is secretly mostly…",
    options: [
      "Blurry food photos",
      "Selfies mid-blink",
      "Sunsets she never posts",
      "Screenshots of dark romance quotes",
    ],
    correctAnswer: 3,
    trait: "camera-roll-diary",
  },
  {
    id: 13,
    question: "A genie offers her one wish. She picks…",
    options: [
      "Endless chai that never runs out",
      "Novels that write themselves",
      "A closet that always fits",
      "Bonus hours just for overthinking",
    ],
    correctAnswer: 3,
    trait: "genie-delulu",
  },
  {
    id: 14,
    question: "Her ultimate rainy-day plan?",
    options: [
      "Blanket burrito + old rewatches",
      "Dark mystery novel in a corner",
      "Baking aggressively while in a mood",
      "All of the above. Obviously.",
    ],
    correctAnswer: 3,
    trait: "rainy-day-overload",
  },
  {
    id: 15,
    question: "Nisha sees a 15% off sale. Reaction?",
    options: [
      "'I don't need anything' (buys three things)",
      "Full cart, zero regrets, it's justified",
      "Adds to cart, leaves it there forever",
      "Buys gifts for friends instead of herself",
    ],
    correctAnswer: 0,
    trait: "sale-menace",
  },
  {
    id: 16,
    question: "Secret superpower Nisha would pick?",
    options: [
      "Reading minds to win arguments",
      "Teleporting to grab snacks",
      "Rewinding awkward conversations",
      "Sleeping anywhere, anytime",
    ],
    correctAnswer: 0,
    trait: "superpower-delulu",
  },
];

export const quizResults: QuizResult[] = [
  {
    type: "rapunzel-chaotic",
    title: "Rapunzel in Full Chaos Mode",
    description:
      "You're peak Nisha energy! Equal parts daydreaming in a tower, overthinking 37 timelines, gossiping with cinematic flair, and arguing with all the love in your heart. A certified tangled queen.",
    score: 8,
    color: "from-purple-500 via-pink-500 to-fuchsia-500",
    character: "rapunzel",
  },
  {
    type: "dark-romance-queen",
    title: "Dark Romance Queen",
    description:
      "You live for morally grey men, Michelle Morrone edits in your brain, and novels have ruined you in the best way. Moody, dramatic, poetic and devastatingly cute.",
    score: 7,
    color: "from-violet-600 via-rose-600 to-purple-700",
    character: "rose",
  },
  {
    type: "gossip-burrito",
    title: "Cozy Gossip Burrito",
    description:
      "Shinchan + Doraemon + pillow fort + tea. You love the drama but also need your comfort era. Softest menace to ever whisper spoilers.",
    score: 6,
    color: "from-pink-400 via-purple-400 to-violet-500",
    character: "burrito",
  },
  {
    type: "horror-mood-swing",
    title: "Horror Mood Swing Gremlin",
    description:
      "One second hiding behind a pillow from ghosts, next second sending cryptic texts in indirect mode. Peak Rapunzel mood swings with thriller main character energy.",
    score: 5,
    color: "from-indigo-600 via-purple-600 to-pink-600",
    character: "gremlin",
  },
  {
    type: "novelworm-delulu",
    title: "Novelworm Delulu Princess",
    description:
      "South Indian films, dark romance, and your own 4K delulu cinematic universe. Reads 300 pages overnight, overthinks every glance, and we love that for you.",
    score: 0,
    color: "from-fuchsia-500 via-violet-500 to-purple-600",
    character: "princess",
  },
];
