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
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="flex flex-col items-center gap-5"
              >
                <motion.span
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-[0.2em] text-pink-200"
                >
                  <Sparkles className="w-4 h-4 text-pink-300" />
                  Personality Quiz
                </motion.span>

                <h1 className="text-4xl md:text-7xl font-black leading-tight bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(192,132,252,0.5)]">
                  Welcome to Nisha's Multiverse
                </h1>

                <p className="text-lg md:text-xl text-purple-100/90 font-light max-w-2xl mx-auto">
                  A chaotic little test of vibes, moods and questionable
                  decisions. Answer honestly — she can always tell.
                </p>
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
