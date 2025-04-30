"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Puzzle from "@/components/Puzzle";

export default function Game() {
 const [currentStage, setCurrentStage] = useState(1);

 // Calcular progresso com base no estágio (4 fases)
 const progress = Math.min(((currentStage - 1) / 4) * 100, 100);

 // Avançar para a próxima fase
 const handleNextStage = () => {
  if (currentStage < 5) {
   setCurrentStage((prev) => prev + 1);
  }
 };

 // Renderizar a fase de acordo com o número
 const renderStage = () => {
  switch (currentStage) {
   case 1:
    return <Puzzle />;
   // Aqui você pode adicionar mais fases
   case 2:
    return <div className="text-xl">⚙️ Fase 2: Em breve...</div>;
   case 3:
    return <div className="text-xl">⚙️ Fase 3: Em breve...</div>;
   case 4:
    return <div className="text-xl">⚙️ Fase 4: Em breve...</div>;
   default:
    return (
     <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-green-600 text-2xl font-semibold mt-4"
     >
      🎉 Desafio Concluído! 🎉
     </motion.div>
    );
  }
 };

 return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6 space-y-8">
   {/* Barra de Progresso */}
   {/* Barra de Progresso */}
   <div className="w-full max-w-md bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
    <motion.div
     className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
     initial={{ width: 0 }}
     animate={{ width: `${progress}%` }}
     transition={{ duration: 0.5 }}
    />
   </div>

   {/* Cabeçalho */}
   {currentStage <= 4 && (
    <motion.h1
     className="text-3xl font-bold"
     initial={{ opacity: 0, y: -20 }}
     animate={{ opacity: 1, y: 0 }}
     key={currentStage}
    >
     Fase {currentStage}
    </motion.h1>
   )}

   {/* Fase atual */}
   {renderStage()}

   {/* Botão de completar fase */}
   {currentStage <= 4 && (
    <motion.button
     whileTap={{ scale: 0.9 }}
     whileHover={{ scale: 1.1 }}
     onClick={handleNextStage}
     className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md hover:from-blue-600 hover:to-purple-600 transition"
    >
     ✅ Completar Fase
    </motion.button>
   )}
  </div>
 );
}
