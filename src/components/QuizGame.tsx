import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { quizQuestions, quizResults } from "../data/quizData";
import type { QuizResult } from "../types/quiz";
import { HeroCharacters } from "./ui/HeroCharacters";
import { MultiverseBackground } from "./ui/MultiverseBackground";
import { ProgressBar } from "./ui/ProgressBar";
import { QuestionCard } from "./ui/QuestionCard";
import { ResultScreen } from "./ui/ResultScreen";
import { Sparkles } from "lucide-react";

type GameState = "start" | "playing" | "result";

const titleWords = "Welcome to Nisha's Multiverse".split(" ");

export function QuizGame() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [batteryChoice, setBatteryChoice] = useState<number | null>(null);

  const handleStart = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setResult(null);
    setBatteryChoice(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    const question = quizQuestions[currentQuestion];
    if (question.id === 9) setBatteryChoice(answerIndex);
    if (answerIndex === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setShowExplanation(true);

    setTimeout(() => {
      setShowExplanation(false);
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        calculateResult();
      }
    }, 1800);
  };

  const calculateResult = () => {
    const total = quizQuestions.length;
    const high = Math.round(total * 0.7);
    const medHigh = Math.round(total * 0.6);
    const med = Math.round(total * 0.4);
    const low = Math.round(total * 0.2);
    let resultType: QuizResult;

    if (score >= high) {
      resultType = quizResults[0];
    } else if (score >= medHigh) {
      resultType = quizResults[1];
    } else if (score >= med) {
      resultType = quizResults[2];
    } else if (score >= low) {
      resultType = quizResults[3];
    } else {
      resultType = quizResults[4];
    }

    setResult({ ...resultType, score });
    setGameState("result");
  };

  const restartGame = () => {
    setGameState("start");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setResult(null);
    setBatteryChoice(null);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === "playing" && selectedAnswer === null) {
        if (e.key >= "1" && e.key <= "4") {
          handleAnswerSelect(parseInt(e.key) - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, selectedAnswer, currentQuestion]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <MultiverseBackground />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {gameState === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="flex flex-col items-center gap-6"
              >
                <motion.span
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/25 backdrop-blur-md shadow-[0_0_30px_rgba(217,70,239,0.25)] text-xs font-semibold uppercase tracking-[0.25em] text-pink-100"
                >
                  <Sparkles className="w-4 h-4 text-pink-300" />
                  Personality Quiz
                </motion.span>

                <h1 className="hue-cycle relative text-4xl md:text-7xl font-black leading-[1.08] tracking-tight text-center">
                  <span
                    aria-hidden
                    className="glow-pulse absolute inset-0 font-black leading-[1.08] tracking-tight bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-400 bg-clip-text text-transparent blur-[40px] pointer-events-none select-none"
                  >
                    Welcome to Nisha's Multiverse
                  </span>
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.11, delayChildren: 0.2 },
                      },
                    }}
                    className="relative block"
                  >
                    {titleWords.map((word, i) => (
                      <motion.span
                        key={i}
                        variants={{
                          hidden: { opacity: 0, y: 48, filter: "blur(12px)", scale: 0.95 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            scale: 1,
                            transition: { type: "spring", stiffness: 90, damping: 16 },
                          },
                        }}
                        className="text-shimmer inline-block mr-[0.32em] bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-400 bg-clip-text text-transparent will-change-transform"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="text-lg md:text-xl text-purple-100/90 font-light max-w-2xl mx-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]"
                >
                  A chaotic little test of vibes, moods and questionable
                  decisions. Answer honestly — she can always tell.
                </motion.p>
              </motion.div>

              <HeroCharacters />

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="group relative px-12 py-6 text-2xl font-bold rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/50 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Quiz
                  <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-purple-200/60"
              >
                Find your Nisha-coded vibe
              </motion.p>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <ProgressBar
                current={currentQuestion + 1}
                total={quizQuestions.length}
                progress={((currentQuestion + 1) / quizQuestions.length) * 100}
              />

              <QuestionCard
                question={quizQuestions[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswer={selectedAnswer}
                showExplanation={showExplanation}
                isCorrect={
                  selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                }
              />
            </motion.div>
          )}

          {gameState === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <ResultScreen
                result={result}
                onRestart={restartGame}
                totalQuestions={quizQuestions.length}
              />

              <div className="w-full">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-purple-200/70 mb-2">
                  Someone wanted to see you off
                </p>
                <HeroCharacters
                  variant="exit"
                  score={score}
                  total={quizQuestions.length}
                  sleepsEarly={batteryChoice === 3}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
