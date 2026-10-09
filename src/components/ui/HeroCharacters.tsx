import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Heart, MessageCircle, Sparkles, Star } from "lucide-react";
import { FallingPetals } from "./FallingPetals";

type Dialogue = {
  speaker: "nisha" | "meezan";
  text: string;
  side: "left" | "right";
};

const INTRO_DIALOGUES: Dialogue[] = [
  {
    speaker: "nisha",
    text: "Meezan! Finally! I was one candle short of putting out a 'wanted' poster.",
    side: "left",
  },
  {
    speaker: "meezan",
    text: "Aw, you'd put my face on a poster? That's the sweetest threat I've ever got.",
    side: "right",
  },
  {
    speaker: "nisha",
    text: "Only because it's the best-looking break-in this kingdom's ever seen.",
    side: "left",
  },
  {
    speaker: "meezan",
    text: "Careful, Princess. Compliments like that go straight to my heart.",
    side: "right",
  },
  {
    speaker: "nisha",
    text: "Good. 'Cause it's been mine since the day we met.",
    side: "left",
  },
  {
    speaker: "meezan",
    text: "And here I thought I was the smooth one. You win. Again.",
    side: "right",
  },
  {
    speaker: "nisha",
    text: "Well, well... look who's here to know about me. Someone's curious.",
    side: "left",
  },
  {
    speaker: "meezan",
    text: "Guilty as charged. So come on, Princess. Show me what you've got.",
    side: "right",
  },
];

function buildExitDialogues(ratio: number, sleepsEarly: boolean): Dialogue[] {
  const scoreLine: Dialogue =
    ratio >= 0.7
      ? {
          speaker: "meezan",
          text: "That score's got main character energy. I'm impressed—and a little scared.",
          side: "right",
        }
      : ratio >= 0.4
        ? {
            speaker: "meezan",
            text: "Decent score. I see the vision—even if the vision's a lil chaotic.",
            side: "right",
          }
        : {
            speaker: "meezan",
            text: "Those answers were a whole mood. Chaotic? Yes. Correct? Rarely. Still adore you.",
            side: "right",
          };

  const sleepLine: Dialogue = sleepsEarly
    ? {
        speaker: "nisha",
        text: "Also... you chose sleep over doom-scrolling at 5%? Finally, someone who gets it. Sleep is self-love. 💤",
        side: "left",
      }
    : {
        speaker: "nisha",
        text: "Anyway, thanks for playing detective on my unhinged little brain.",
        side: "left",
      };

  return [
    {
      speaker: "nisha",
      text: "So THOSE are how your answers actually landed. Noted. All of 'em. 📝",
      side: "left",
    },
    scoreLine,
    sleepLine,
    {
      speaker: "meezan",
      text: "Tower's getting cold, Princess. Don't take too long coming back.",
      side: "right",
    },
    {
      speaker: "nisha",
      text: "Bye bye, goofball. Come find me soon—I'll leave a lantern on. 💕",
      side: "left",
    },
  ];
}

function TalkingBars({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-3.5">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-white"
          animate={
            active
              ? { height: ["30%", "100%", "45%", "80%", "30%"] }
              : { height: "30%", opacity: 0.4 }
          }
          transition={
            active
              ? { duration: 0.9, repeat: Infinity, delay: i * 0.12 }
              : { duration: 0.3 }
          }
          style={{ height: "30%" }}
        />
      ))}
    </div>
  );
}

function GirlCharacter() {
  return (
    <svg
      viewBox="0 0 320 424"
      className="w-32 h-40 sm:w-44 sm:h-56 md:w-[290px] md:h-[384px] overflow-visible"
    >
      <defs>
        <linearGradient id="gSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe7d6" />
          <stop offset="100%" stopColor="#f7bd97" />
        </linearGradient>
        <linearGradient id="gHairBack" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#3b0764" />
          <stop offset="55%" stopColor="#7e22ce" />
          <stop offset="100%" stopColor="#c026d3" />
        </linearGradient>
        <linearGradient id="gHair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5b21b6" />
          <stop offset="50%" stopColor="#a21caf" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="gTop" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
        <linearGradient id="gScarf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <linearGradient id="gIris" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <radialGradient id="gBlush">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M48 424 C34 352 48 232 66 178 C88 94 122 50 160 50 C198 50 232 94 254 178 C272 232 286 352 272 424 Q250 404 236 424 Q218 402 200 424 Q178 402 160 424 Q142 402 120 424 Q102 402 84 424 Q66 404 48 424 Z"
        fill="url(#gHairBack)"
      />

      <path d="M144 240 L144 298 Q160 308 176 298 L176 240 Z" fill="#f3b48f" />
      <ellipse cx="160" cy="252" rx="27" ry="12" fill="#e9a882" opacity="0.55" />

      <path
        d="M62 424 L62 372 C62 332 98 300 138 294 C148 302 172 302 182 294 C222 300 258 332 258 372 L258 424 Z"
        fill="url(#gTop)"
      />
      <path
        d="M132 288 C126 310 132 330 160 332 C188 330 194 310 188 288 C176 302 144 302 132 288 Z"
        fill="url(#gScarf)"
      />
      <path
        d="M152 328 L157 376 Q160 382 165 376 L170 328 Q160 336 152 328 Z"
        fill="url(#gScarf)"
        opacity="0.92"
      />

      <ellipse cx="79" cy="178" rx="13" ry="19" fill="#f3b48f" />
      <ellipse cx="241" cy="178" rx="13" ry="19" fill="#f3b48f" />
      <path
        d="M160 78 C206 78 236 112 236 162 C236 206 214 244 176 256 C172 257 168 258 160 258 C152 258 148 257 144 256 C106 244 84 206 84 162 C84 112 114 78 160 78 Z"
        fill="url(#gSkin)"
      />

      <ellipse cx="110" cy="200" rx="17" ry="11" fill="url(#gBlush)" />
      <ellipse cx="210" cy="200" rx="17" ry="11" fill="url(#gBlush)" />

      <path
        d="M82 158 C78 108 112 70 160 70 C208 70 242 108 238 158 C232 136 222 120 208 114 C190 150 162 162 138 148 C122 140 100 148 82 158 Z"
        fill="url(#gHair)"
      />

      <path
        d="M112 148 Q128 139 146 148"
        stroke="#6d28d9"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M174 148 Q192 139 208 148"
        stroke="#6d28d9"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      <motion.g
        style={{ transformOrigin: "160px 178px", transformBox: "view-box" }}
        animate={{ scaleY: [1, 1, 0.08, 1] }}
        transition={{
          duration: 4.6,
          times: [0, 0.92, 0.96, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path d="M112 176 Q128 158 144 176 Q128 194 112 176 Z" fill="#ffffff" />
        <circle cx="128" cy="177" r="11" fill="url(#gIris)" />
        <circle cx="128" cy="178" r="5" fill="#241238" />
        <circle cx="124" cy="172" r="3.6" fill="#ffffff" />
        <circle cx="131" cy="182" r="1.6" fill="#ffffff" opacity="0.85" />
        <path
          d="M110 175 Q128 153 146 175"
          stroke="#3b1054"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        />

        <path d="M176 176 Q192 158 208 176 Q192 194 176 176 Z" fill="#ffffff" />
        <circle cx="192" cy="177" r="11" fill="url(#gIris)" />
        <circle cx="192" cy="178" r="5" fill="#241238" />
        <circle cx="188" cy="172" r="3.6" fill="#ffffff" />
        <circle cx="195" cy="182" r="1.6" fill="#ffffff" opacity="0.85" />
        <path
          d="M174 175 Q192 153 210 175"
          stroke="#3b1054"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      <path
        d="M158 202 Q161 210 166 207"
        stroke="#e5a884"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M146 222 Q160 235 174 222 Q160 229 146 222 Z" fill="#d84a72" />

      <path
        d="M84 148 C74 190 72 232 80 268 C92 236 100 196 104 166 C96 162 88 156 84 148 Z"
        fill="url(#gHair)"
      />
      <path
        d="M236 148 C246 190 248 232 240 268 C228 236 220 196 216 166 C224 162 232 156 236 148 Z"
        fill="url(#gHair)"
      />

      <path
        d="M126 96 C116 128 114 168 122 206"
        stroke="#f9a8d4"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M196 104 C204 136 206 172 200 206"
        stroke="#c4b5fd"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.45"
      />

      <g transform="translate(214 110)">
        <g fill="#f9a8d4">
          <circle cx="0" cy="-9" r="6" />
          <circle cx="8.5" cy="-2.8" r="6" />
          <circle cx="5.3" cy="7.3" r="6" />
          <circle cx="-5.3" cy="7.3" r="6" />
          <circle cx="-8.5" cy="-2.8" r="6" />
        </g>
        <circle r="4.6" fill="#fde68a" />
      </g>
    </svg>
  );
}

function BoyCharacter() {
  return (
    <svg
      viewBox="0 0 320 424"
      className="w-32 h-40 sm:w-44 sm:h-56 md:w-[290px] md:h-[384px] overflow-visible"
    >
      <defs>
        <linearGradient id="bSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3cfa8" />
          <stop offset="100%" stopColor="#dfa878" />
        </linearGradient>
        <linearGradient id="bHair" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#1f1b2e" />
          <stop offset="60%" stopColor="#3b2f52" />
          <stop offset="100%" stopColor="#6d5b8a" />
        </linearGradient>
        <linearGradient id="bJacket" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="bIris" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <radialGradient id="bBlush">
          <stop offset="0%" stopColor="#e0704f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e0704f" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M84 176 C80 112 112 64 160 64 C208 64 240 112 236 176 C232 150 224 130 210 120 C188 138 132 138 110 120 C96 130 88 150 84 176 Z"
        fill="url(#bHair)"
      />

      <path d="M146 240 L146 298 Q160 308 174 298 L174 240 Z" fill="#d99f6e" />
      <ellipse cx="160" cy="252" rx="26" ry="11" fill="#c98a5e" opacity="0.5" />

      <path
        d="M58 424 L58 370 C58 330 96 300 136 293 C146 302 174 302 184 293 C224 300 262 330 262 370 L262 424 Z"
        fill="url(#bJacket)"
      />
      <path
        d="M136 293 L160 342 L150 350 L126 300 Z"
        fill="#7c2d12"
        opacity="0.85"
      />
      <path
        d="M184 293 L160 342 L170 350 L194 300 Z"
        fill="#7c2d12"
        opacity="0.85"
      />
      <path
        d="M146 293 L160 342 L174 293 Q160 301 146 293 Z"
        fill="#fef3c7"
      />
      <path
        d="M160 344 L160 424"
        stroke="#7c2d12"
        strokeWidth="3"
        opacity="0.5"
      />

      <ellipse cx="81" cy="180" rx="12" ry="18" fill="#e0a878" />
      <ellipse cx="239" cy="180" rx="12" ry="18" fill="#e0a878" />
      <path
        d="M160 80 C204 80 234 112 234 162 C234 204 212 242 176 254 C172 257 168 258 160 258 C152 258 148 257 144 254 C108 242 86 204 86 162 C86 112 116 80 160 80 Z"
        fill="url(#bSkin)"
      />

      <ellipse cx="112" cy="202" rx="15" ry="9" fill="url(#bBlush)" />
      <ellipse cx="208" cy="202" rx="15" ry="9" fill="url(#bBlush)" />

      <path
        d="M82 160 C80 106 114 66 160 66 C206 66 240 106 238 160 C232 136 224 120 210 112 C200 132 184 142 166 142 C150 142 132 134 120 120 C106 128 90 142 82 160 Z"
        fill="url(#bHair)"
      />
      <path
        d="M176 78 C190 58 214 54 226 62 C210 66 194 76 188 90 Z"
        fill="url(#bHair)"
      />

      <path
        d="M110 150 Q128 141 148 150"
        stroke="#2b2140"
        strokeWidth="4.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M172 150 Q192 141 210 150"
        stroke="#2b2140"
        strokeWidth="4.6"
        fill="none"
        strokeLinecap="round"
      />

      <motion.g
        style={{ transformOrigin: "160px 180px", transformBox: "view-box" }}
        animate={{ scaleY: [1, 1, 0.08, 1] }}
        transition={{
          duration: 5.1,
          times: [0, 0.93, 0.97, 1],
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7,
        }}
      >
        <path d="M112 179 Q128 163 144 179 Q128 193 112 179 Z" fill="#ffffff" />
        <circle cx="128" cy="180" r="10" fill="url(#bIris)" />
        <circle cx="128" cy="181" r="4.6" fill="#2a1a10" />
        <circle cx="124.5" cy="176" r="3.2" fill="#ffffff" />
        <path
          d="M111 178 Q128 160 145 178"
          stroke="#231a12"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        <path d="M176 179 Q192 163 208 179 Q192 193 176 179 Z" fill="#ffffff" />
        <circle cx="192" cy="180" r="10" fill="url(#bIris)" />
        <circle cx="192" cy="181" r="4.6" fill="#2a1a10" />
        <circle cx="188.5" cy="176" r="3.2" fill="#ffffff" />
        <path
          d="M175 178 Q192 160 209 178"
          stroke="#231a12"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      <path
        d="M158 204 Q161 212 166 209"
        stroke="#c98a5e"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M146 226 Q160 234 176 222 Q160 228 146 226 Z" fill="#c1634f" />
    </svg>
  );
}

function Pedestal({ from, to }: { from: string; to: string }) {
  return (
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none">
      <div
        className="w-40 h-10 md:w-56 md:h-14 rounded-[100%] blur-md opacity-70"
        style={{ background: `radial-gradient(ellipse at center, ${from}, ${to} 60%, transparent 72%)` }}
      />
    </div>
  );
}

const HUG_HEARTS = [
  { dx: -64, dy: -150, size: 26, delay: 0 },
  { dx: 58, dy: -130, size: 20, delay: 0.05 },
  { dx: -30, dy: -190, size: 30, delay: 0.1 },
  { dx: 34, dy: -170, size: 24, delay: 0.15 },
  { dx: 0, dy: -215, size: 36, delay: 0.05 },
  { dx: -92, dy: -105, size: 18, delay: 0.2 },
  { dx: 90, dy: -95, size: 18, delay: 0.2 },
  { dx: -14, dy: -245, size: 22, delay: 0.15 },
];

interface HeroCharactersProps {
  variant?: "intro" | "exit";
  score?: number;
  total?: number;
  sleepsEarly?: boolean;
}

export function HeroCharacters({
  variant = "intro",
  score = 0,
  total = 1,
  sleepsEarly = false,
}: HeroCharactersProps) {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);
  const [hugging, setHugging] = useState(false);
  const [hugged, setHugged] = useState(false);
  const [hugOffset, setHugOffset] = useState(46);

  const dialogues = useMemo(() => {
    if (variant !== "exit") return INTRO_DIALOGUES;
    return buildExitDialogues(total > 0 ? score / total : 0, sleepsEarly);
  }, [variant, score, total, sleepsEarly]);

  useEffect(() => {
    const update = () => setHugOffset(window.innerWidth < 640 ? 16 : 46);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDialogue(false);
      setTimeout(() => {
        setCurrentDialogue((prev) => (prev + 1) % dialogues.length);
        setShowDialogue(true);
      }, 320);
    }, 5500);

    return () => clearInterval(interval);
  }, [dialogues.length]);

  const triggerHug = () => {
    if (hugging) return;
    setHugging(true);
    setHugged(true);
    window.setTimeout(() => setHugging(false), 1600);
  };

  const active = dialogues[currentDialogue].speaker;

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[460px] md:h-[560px] flex items-end justify-center overflow-hidden">
      <FallingPetals count={20} className="z-20" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[520px] h-[320px] bg-gradient-to-r from-purple-500/30 via-pink-500/25 to-amber-500/25 rounded-[100%] blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3.4, repeat: Infinity }}
          className="absolute top-12 left-16"
        >
          <Sparkles className="w-7 h-7 text-pink-300" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4.2, repeat: Infinity, delay: 0.8 }}
          className="absolute top-20 right-20"
        >
          <Star className="w-6 h-6 text-amber-300" />
        </motion.div>
      </div>

      <div className="relative z-10 flex items-end justify-center gap-1 md:gap-10 px-1 pb-20 md:pb-28">
        <motion.button
          initial={{ x: -120, opacity: 0 }}
          animate={{
            x: hugging ? hugOffset : 0,
            opacity: 1,
            scale: active === "nisha" ? 1.04 : 0.97,
            rotate: hugging ? 5 : 0,
          }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          whileTap={{ scale: 0.96 }}
          onClick={triggerHug}
          aria-label="Give Nisha a hug"
          className="relative flex flex-col items-center cursor-pointer"
        >
          <Pedestal
            from={active === "nisha" ? "rgba(236,72,153,0.55)" : "rgba(168,85,247,0.35)"}
            to="rgba(124,58,237,0.12)"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              filter:
                active === "nisha"
                  ? "drop-shadow(0 0 42px rgba(236,72,153,0.75))"
                  : "drop-shadow(0 0 22px rgba(168,85,247,0.35))",
            }}
          >
            <GirlCharacter />
          </motion.div>
        </motion.button>

        <motion.button
          initial={{ x: 120, opacity: 0 }}
          animate={{
            x: hugging ? -hugOffset : 0,
            opacity: 1,
            scale: active === "meezan" ? 1.04 : 0.97,
            rotate: hugging ? -5 : 0,
          }}
          transition={{ type: "spring", duration: 1, delay: 0.4 }}
          whileTap={{ scale: 0.96 }}
          onClick={triggerHug}
          aria-label="Give Meezan a hug"
          className="relative flex flex-col items-center cursor-pointer"
        >
          <Pedestal
            from={active === "meezan" ? "rgba(245,158,11,0.55)" : "rgba(245,158,11,0.32)"}
            to="rgba(180,83,9,0.12)"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            style={{
              filter:
                active === "meezan"
                  ? "drop-shadow(0 0 42px rgba(245,158,11,0.75))"
                  : "drop-shadow(0 0 22px rgba(245,158,11,0.32))",
            }}
          >
            <BoyCharacter />
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {hugging && (
          <motion.div
            key="hug-burst"
            className="absolute left-1/2 top-[62%] -translate-x-1/2 z-20 pointer-events-none"
          >
            {HUG_HEARTS.map((h, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: h.dx,
                  y: h.dy,
                  scale: [0, 1.15, 1],
                  opacity: [0, 1, 0],
                  rotate: [0, h.dx > 0 ? 18 : -18],
                }}
                transition={{ duration: 1.3, delay: h.delay, ease: "easeOut" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                >
                  <Heart
                    style={{
                      width: h.size,
                      height: h.size,
                      fill: "rgba(244,114,182,0.6)",
                    }}
                    className="text-rose-300"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!hugged && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="pointer-events-none absolute top-16 md:top-20 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-xs md:text-sm text-pink-100/90 whitespace-nowrap"
        >
          We missed each other — tap Nisha or Meezan for a hug 💕
        </motion.div>
      )}

      <div className="absolute top-3 left-4 md:top-5 md:left-6 z-30">
        <motion.div
          animate={{
            opacity: active === "nisha" ? 1 : 0.65,
            scale: active === "nisha" ? 1.05 : 1,
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm border border-white/30 shadow-lg shadow-purple-500/40"
        >
          <span className="text-white font-bold text-sm">Nisha</span>
          <TalkingBars active={active === "nisha"} />
        </motion.div>
      </div>

      <div className="absolute top-3 right-4 md:top-5 md:right-6 z-30">
        <motion.div
          animate={{
            opacity: active === "meezan" ? 1 : 0.65,
            scale: active === "meezan" ? 1.05 : 1,
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm border border-white/30 shadow-lg shadow-amber-500/40"
        >
          <TalkingBars active={active === "meezan"} />
          <span className="text-white font-bold text-sm">Meezan</span>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {showDialogue && (
          <motion.div
            key={currentDialogue}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-4 md:bottom-7 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-30"
          >
            <div
              className={`relative p-5 md:p-6 rounded-3xl backdrop-blur-xl border shadow-2xl ${
                active === "nisha"
                  ? "bg-purple-500/25 border-purple-400/50 shadow-purple-500/30"
                  : "bg-amber-500/25 border-amber-400/50 shadow-amber-500/30"
              }`}
            >
              <div className="flex items-start gap-2 mb-1.5">
                <MessageCircle
                  className={`w-5 h-5 mt-0.5 ${
                    active === "nisha" ? "text-pink-300" : "text-amber-300"
                  }`}
                />
                <span
                  className={`text-sm font-bold uppercase tracking-wide ${
                    active === "nisha" ? "text-pink-200" : "text-amber-200"
                  }`}
                >
                  {active === "nisha" ? "Nisha" : "Meezan"}
                </span>
              </div>
              <p className="text-base md:text-lg text-white font-medium leading-relaxed pl-7">
                {dialogues[currentDialogue].text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
