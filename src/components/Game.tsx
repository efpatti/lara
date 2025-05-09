"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Puzzle from "@/components/Puzzle";

const GAMES = [
 { id: "puzzle", name: "Quebra-Cabeça", component: Puzzle, icon: "🧩" },
];

const THEMES = {
 gótica: {
  bg: "bg-gradient-to-br from-gray-900 to-purple-900",
  text: "text-purple-300",
  button: "bg-gradient-to-r from-gray-700 to-purple-800",
 },
 rabuda: {
  bg: "bg-gradient-to-br from-pink-500 to-yellow-400",
  text: "text-white",
  button: "bg-gradient-to-r from-pink-600 to-yellow-500",
 },
 ecleticballs: {
  bg: "bg-gradient-to-br from-green-400 to-blue-500",
  text: "text-yellow-200",
  button: "bg-gradient-to-r from-green-500 to-blue-600",
 },
};

export default function GamePortal() {
 const [phase, setPhase] = useState<"name" | "theme" | "games" | "final">(
  "name"
 );
 const [nickname, setNickname] = useState("");
 const [selectedTheme, setSelectedTheme] = useState<keyof typeof THEMES | null>(
  null
 );
 const [currentGameIndex, setCurrentGameIndex] = useState(0);
 const [completedGames, setCompletedGames] = useState<string[]>([]);

 const handleNameSubmit = () => {
  if (nickname.trim()) {
   setPhase("theme");
  }
 };

 const handleThemeSelect = (theme: keyof typeof THEMES) => {
  setSelectedTheme(theme);
  setPhase("games");
  setCurrentGameIndex(0);
 };

 const completeCurrentGame = () => {
  const currentGameId = GAMES[currentGameIndex].id;
  setCompletedGames([...completedGames, currentGameId]);

  if (currentGameIndex < GAMES.length - 1) {
   setCurrentGameIndex(currentGameIndex + 1);
  } else {
   setPhase("final");
  }
 };

 const gamesProgress = (completedGames.length / GAMES.length) * 100;

 return (
  <motion.div
   className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${
    selectedTheme
     ? THEMES[selectedTheme].bg
     : "bg-gradient-to-br from-blue-50 to-purple-100"
   }`}
  >
   {/* Fase 1: Digitar Nome */}
   {phase === "name" && (
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     className="w-full max-w-md space-y-6 text-center"
    >
     <h2 className="text-2xl font-bold text-gray-700">Como quer me chamar?</h2>
     <div className="flex gap-2">
      <input
       type="text"
       value={nickname}
       onChange={(e) => setNickname(e.target.value)}
       className="flex-1 px-4 py-2 rounded-full border-2 border-purple-300 focus:outline-none focus:border-purple-500"
       placeholder="Digite um apelido especial"
       onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
      />
      <motion.button
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       onClick={handleNameSubmit}
       disabled={!nickname.trim()}
       className="px-6 py-2 bg-purple-500 text-white rounded-full disabled:opacity-50"
      >
       Enviar
      </motion.button>
     </div>
    </motion.div>
   )}

   {/* Fase 2: Escolher Tema */}
   {phase === "theme" && (
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     className="w-full max-w-md space-y-6 text-center"
    >
     <h2 className="text-2xl font-bold text-gray-700">Escolha o estilo:</h2>
     <div className="grid grid-cols-2 gap-3">
      {Object.entries(THEMES).map(([theme, config]) => (
       <motion.button
        key={theme}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => handleThemeSelect(theme as keyof typeof THEMES)}
        className={`px-4 py-3 rounded-xl ${config.button} text-white font-medium`}
       >
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
       </motion.button>
      ))}
     </div>
    </motion.div>
   )}

   {/* Fase 3: Jogos */}
   {phase === "games" && (
    <div className="w-full max-w-2xl space-y-6">
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
     >
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
       <motion.div
        className="h-full bg-gradient-to-r from-green-400 to-blue-500"
        initial={{ width: "0%" }}
        animate={{ width: `${gamesProgress}%` }}
        transition={{ duration: 0.5 }}
       />
      </div>
      <div className="absolute top-0 left-0 right-0 flex justify-between text-xs px-1 pt-4">
       {GAMES.map((game, index) => (
        <span
         key={game.id}
         className={index <= currentGameIndex ? "font-bold" : ""}
        >
         {game.icon} {game.name}
        </span>
       ))}
      </div>
     </motion.div>

     <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 shadow-xl">
      {(() => {
       const CurrentGame = GAMES[currentGameIndex].component;
       return (
        <CurrentGame
         onComplete={completeCurrentGame}
         theme={selectedTheme || "normal"}
        />
       );
      })()}
     </div>
    </div>
   )}

   {/* Fase Final */}
   {phase === "final" && (
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     className="text-center space-y-6"
    >
     <motion.div
      animate={{
       scale: [1, 1.1, 1],
       rotate: [0, 5, -5, 0],
      }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="text-8xl"
     >
      🌸
     </motion.div>
     <h1 className="text-4xl font-bold text-white">
      Parabéns, {nickname || "amor"}!
     </h1>
     <p className="text-xl text-white">
      Você completou todos os desafios do nosso amor!
     </p>
     <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 bg-white bg-opacity-20 rounded-full text-white border-2 border-white"
     >
      Clique para nossa surpresa especial
     </motion.button>
    </motion.div>
   )}
  </motion.div>
 );
}
