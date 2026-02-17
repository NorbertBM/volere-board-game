"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dice5, Sparkles } from "lucide-react";

/**
 * D10 Dice Roller
 * - Click Roll to animate and reveal a random 1–10 result
 * - Optional: set `onResult` to receive the rolled value
 */
export default function D10DiceRoller({
  onResult,
  label = "Roll 1d10",
  disabled = false,
}) {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null); // number | null
  const [nonce, setNonce] = useState(0); // forces re-randomization during roll

  const rollValue = useMemo(() => {
    // During rolling we want the face to change frequently.
    // nonce changes on an interval while rolling.
    return Math.floor(Math.random() * 10) + 1;
  }, [nonce]);

  const canRoll = !disabled && !isRolling;

  const handleRoll = async () => {
    if (!canRoll) return;

    setIsRolling(true);
    setResult(null);

    // 1) Rapidly cycle faces for a short “shake + flip” effect
    const start = performance.now();
    const durationMs = 900;

    await new Promise((resolve) => {
      const tick = (t) => {
        const elapsed = t - start;
        setNonce((n) => n + 1);
        if (elapsed >= durationMs) return resolve();
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    // 2) Final roll
    const final = Math.floor(Math.random() * 10) + 1;
    setResult(final);
    onResult?.(final);

    // 3) Hold a beat so the animation feels finished
    await new Promise((r) => setTimeout(r, 250));
    setIsRolling(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="rounded-2xl shadow-sm border bg-neutral-900 border-neutral-800 p-4 sm:p-5 text-neutral-200
"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-gray-700">{label}</div>
            <div className="text-xs text-gray-500 mt-1">
              Click the button to roll a ten-sided die.
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>1–10</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center">
          <div className="flex items-center justify-center">
            <DiceFace value={result ?? rollValue} isRolling={isRolling} />
          </div>

          <div className="flex sm:flex-col gap-2 justify-center">
            <button
              onClick={handleRoll}
              disabled={!canRoll}
              className={
                "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition active:scale-[0.98] " +
                (canRoll
                  ? "bg-teal-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-teal-300 transition cursor-pointer"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed")
              }
            >
              <Dice5 className="w-4 h-4" />
              {isRolling ? "Rolling…" : "Roll"}
            </button>

            <div className="rounded-xl border bg-gray-50 px-4 py-2 text-center">
              <div className="text-[11px] uppercase tracking-wide text-gray-500">
                Result
              </div>
              <div className="text-lg font-bold text-gray-900 leading-tight">
                {result ?? "—"}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {result !== null && !isRolling && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-4 rounded-xl border bg-white px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-gray-700">
                  You rolled <span className="font-bold">{result}</span>.
                </div>
                <span className="text-xs text-gray-500">d10</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DiceFace({ value, isRolling }) {
  // A simple “d10” token look: rounded square with inner bevel.
  // Motion: shake + rotate during rolling, pop when result lands.
  return (
    <motion.div
      className="relative"
      animate={
        isRolling
          ? {
              rotate: [0, 18, -14, 10, -6, 0],
              x: [0, -6, 6, -4, 4, 0],
              y: [0, 4, -4, 3, -3, 0],
              scale: [1, 1.05, 1.02, 1.06, 1.02, 1],
            }
          : { scale: 1 }
      }
      transition={
        isRolling
          ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" }
          : { type: "spring", stiffness: 500, damping: 30 }
      }
    >
      <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-gray-900 shadow-md flex items-center justify-center">
        <div className="w-[86%] h-[86%] rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={String(value)}
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 8 }}
              transition={{ type: "spring", stiffness: 600, damping: 28 }}
              className="select-none"
            >
              <div className="text-5xl sm:text-6xl font-extrabold text-gray-900 tabular-nums">
                {value}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
        <div className="rounded-full bg-white border shadow-sm px-3 py-1 text-[11px] font-semibold text-gray-700">
          d10
        </div>
      </div>
    </motion.div>
  );
}
