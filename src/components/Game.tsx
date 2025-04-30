"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Game() {
 const [currentStage, setCurrentStage] = useState(1);

 const handleNextStage = () => {
  if (currentStage < 5) {
   setCurrentStage((prev) => prev + 1);
  }
 };

 // Calcular progresso com base no estágio
 const progress = Math.min(((currentStage - 1) / 4) * 100, 100);

 return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 space-y-8">
   {/* Barra de Progresso */}
   <div className="w-full max-w-md bg-gray-300 rounded-full h-6 overflow-hidden">
    <motion.div
     className="h-full bg-green-500"
     initial={{ width: 0 }}
     animate={{ width: `${progress}%` }}
     transition={{ duration: 0.5 }}
    />
   </div>

   {currentStage <= 4 ? (
    <>
     <motion.h1
      className="text-3xl font-bold"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      key={currentStage} // para animar quando muda de fase
     >
      Fase {currentStage}
     </motion.h1>

     <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onClick={handleNextStage}
      className="px-6 py-3 bg-blue-500 text-white rounded-2xl shadow-md hover:bg-blue-600 transition"
     >
      Completar Fase
     </motion.button>
    </>
   ) : (
    <motion.div
     initial={{ opacity: 0, scale: 0.8 }}
     animate={{ opacity: 1, scale: 1 }}
     className="text-green-600 text-2xl font-semibold mt-4"
    >
     🎉 Desafio Concluído! 🎉
    </motion.div>
   )}
  </div>
 );
}
