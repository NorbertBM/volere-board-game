"use client";

import { useState } from "react";
import D10DiceRoller from "./components/D10DiceRoller";
import Image from "next/image";

export default function Home() {
  const [result, setResult] = useState<number | null>(null);
  return (
    <main className="bg-neutral-950 text-neutral-200 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-28 px-6 border-b border-neutral-800">
        <h1 className="text-5xl md:text-7xl font-bold tracking-widest">
          VOLERE
        </h1>
        <p className="text-teal-400 mt-4 text-xl">
          A Survival Horror Board Game
        </p>

        <p className="mt-6 max-w-2xl mx-auto text-neutral-400">
          Explore a modular scientific facility. Solve environmental puzzles.
          Survive escalating threats. Designed specifically for 1–2 players.
        </p>

        <div className="mt-8">
          <a
            href="#about"
            className="bg-teal-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-teal-300 transition"
          >
            Enter the Facility
          </a>
        </div>
      </section>
      {/* Media Gallery */}
      <section className="py-24 px-6 border-t border-neutral-800 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-3">Game Assets</h2>
            <small className="text-neutral-600">
              ( NOT final Art. Work in progress! )
            </small>
            <p className="text-neutral-400">
              Cards, panels, and map layouts from the Volere prototype.
            </p>
          </div>

          {(() => {
            const items = [
              {
                src: "/images/mutant-guard.png",
                title: "Miles – Guard (Card)",
              },
              {
                src: "/images/mutant-labworker.png",
                title: "Laborantis – Labworker (Card)",
              },
              { src: "/images/mutant-rat.png", title: "Rattus – Rat (Card)" },
              { src: "/images/mutant-dog.png", title: "Canis – Dog (Card)" },
              {
                src: "/images/security-check-area.png",
                title: "Security Check (Map)",
              },
              { src: "/images/main-area.png", title: "Main Area (Map)" },
              {
                src: "/images/main-entrance-area.png",
                title: "Main Entrance (Map)",
              },
              {
                src: "/images/character-anna.png",
                title: "Anna Smith (Character Panel)",
              },
              {
                src: "/images/character-caretaker.png",
                title: "Caretaker (Character Panel)",
              },
            ];

            return (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <a
                    key={item.src}
                    href={item.src}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden hover:border-neutral-700 transition"
                  >
                    <div className="relative aspect-[4/5] bg-neutral-950">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4 group-hover:scale-[1.02] transition"
                      />
                    </div>

                    <div className="px-4 py-3 border-t border-neutral-800">
                      <div className="text-sm font-semibold text-neutral-200">
                        {item.title}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        Click to open
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Game Info */}
      <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Game Overview
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="text-teal-400 font-semibold">Players</h3>
            <p className="mt-2">1–2</p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="text-teal-400 font-semibold">Playtime</h3>
            <p className="mt-2">60–90 Minutes</p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="text-teal-400 font-semibold">Age</h3>
            <p className="mt-2">14+</p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="text-teal-400 font-semibold">Genre</h3>
            <p className="mt-2">Survival Horror</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Core Experience
          </h2>

          <ul className="space-y-4 text-neutral-300">
            <li>• Modular laboratory sections</li>
            <li>
              • Integrated puzzle systems inspired by classic survival horror
            </li>
            <li>• Tactical movement & door-based tension</li>
            <li>• Escalating enemy patrol mechanics</li>
            <li>• Designed for solo and 2-player cooperative play</li>
          </ul>
        </div>
      </section>
      {/* Dice Roller Section */}
      <section className="py-24 px-6 border-t border-neutral-800 bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Test Your Luck</h2>

          <p className="text-neutral-400 mb-10">
            Volere uses tactical dice resolution. Roll a d10 and feel the
            tension.
          </p>

          <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
            <D10DiceRoller
              label="Roll 1d10 – Prototype Test"
              onResult={setResult}
            />
          </div>
        </div>
      </section>
      {/* Social */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-semibold mb-6">Follow Development</h2>

        <div className="flex justify-center gap-6 text-teal-400 font-semibold">
          <a
            href="https://www.instagram.com/volere_board_game/"
            className="hover:text-teal-300 transition"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/channel/UC4OGwb9D7th3Dj7-0do7HeA"
            className="hover:text-teal-300 transition"
          >
            YouTube
          </a>
          <a
            href="https://twitter.com/volere_game"
            className="hover:text-teal-300 transition"
          >
            Twitter / X
          </a>
        </div>
      </section>

      <footer className="text-center py-10 border-t border-neutral-800 text-neutral-500 text-sm">
        © 2026 Volere. All rights reserved.
      </footer>
    </main>
  );
}
