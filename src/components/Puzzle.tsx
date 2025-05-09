"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PuzzlePieceData } from "@/components/PuzzleBoard";
import dynamic from "next/dynamic";

const PuzzleBoard = dynamic(
 () => import("@/components/PuzzleBoard").then((mod) => mod.PuzzleBoard),
 { ssr: false }
);

type PuzzleProps = {
 onComplete: () => void;
 theme: keyof typeof themes;
};

const themes = {
 gótica: {
  bg: "from-gray-800 to-purple-900",
  button: "from-gray-700 to-purple-800 hover:from-gray-800 hover:to-purple-900",
  text: "text-purple-200",
 },
 rabuda: {
  bg: "from-pink-500 to-yellow-400",
  button: "from-pink-600 to-yellow-500 hover:from-pink-700 hover:to-yellow-600",
  text: "text-white",
 },
 ecleticballs: {
  bg: "from-green-400 to-blue-500",
  button: "from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700",
  text: "text-yellow-100",
 },
 normal: {
  bg: "from-blue-100 to-purple-100",
  button: "from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600",
  text: "text-gray-800",
 },
};

export default function Puzzle({ onComplete, theme = "normal" }: PuzzleProps) {
 const [pieces, setPieces] = useState<PuzzlePieceData[]>([]);
 const [isComplete, setIsComplete] = useState(false);
 const [selectedImage, setSelectedImage] = useState<string | null>(null);
 const currentTheme = themes[theme];

 // Imagem padrão do relacionamento (substitua pela sua)
 const defaultImage = "/lara.jpg";

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const imgURL = URL.createObjectURL(file);
  processImage(imgURL);
  setSelectedImage(imgURL);
 };

 const processImage = (imgSrc: string) => {
  const img = new Image();
  img.src = imgSrc;

  img.onload = () => {
   const rows = 3;
   const cols = 3;
   const boardWidth = Math.min(800, window.innerWidth - 40);
   const boardHeight = (boardWidth * img.height) / img.width;
   const pieceWidth = boardWidth / cols;
   const pieceHeight = boardHeight / rows;

   const canvas = document.createElement("canvas");
   canvas.width = boardWidth;
   canvas.height = boardHeight;
   const ctx = canvas.getContext("2d")!;
   ctx.drawImage(img, 0, 0, boardWidth, boardHeight);

   const tempPieces: PuzzlePieceData[] = [];
   const pieceCanvas = document.createElement("canvas");
   pieceCanvas.width = pieceWidth;
   pieceCanvas.height = pieceHeight;
   const pieceCtx = pieceCanvas.getContext("2d")!;

   for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
     pieceCtx.clearRect(0, 0, pieceWidth, pieceHeight);
     pieceCtx.drawImage(
      canvas,
      x * pieceWidth,
      y * pieceHeight,
      pieceWidth,
      pieceHeight,
      0,
      0,
      pieceWidth,
      pieceHeight
     );

     tempPieces.push({
      src: pieceCanvas.toDataURL(),
      width: pieceWidth,
      height: pieceHeight,
      x: Math.random() * (boardWidth - pieceWidth),
      y: Math.random() * (boardHeight - pieceHeight) + 100,
      correctX: x * pieceWidth,
      correctY: y * pieceHeight,
     });
    }
   }

   setPieces(tempPieces);
   setIsComplete(false);
  };
 };

 const checkCompletion = (updatedPieces: PuzzlePieceData[]) => {
  const allCorrect = updatedPieces.every(
   (piece) =>
    Math.abs(piece.x - piece.correctX) < 10 &&
    Math.abs(piece.y - piece.correctY) < 10
  );

  if (allCorrect && !isComplete) {
   setIsComplete(true);
   setTimeout(() => {
    onComplete();
   }, 1500);
  }
 };

 useEffect(() => {
  // Carrega imagem padrão automaticamente
  processImage(defaultImage);
  setSelectedImage(defaultImage);
 }, []);

 return (
  <motion.div
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   className={`flex flex-col items-center p-6 rounded-xl bg-gradient-to-br ${currentTheme.bg} min-h-[500px]`}
  >
   <motion.h1
    className={`text-3xl font-bold mb-6 ${currentTheme.text}`}
    animate={{ scale: isComplete ? 1.1 : 1 }}
    transition={{ type: "spring", stiffness: 500 }}
   >
    {isComplete ? "🎉 Parabéns! 🎉" : "Monte Nosso Quebra-Cabeça"}
   </motion.h1>

   {!selectedImage ? (
    <div className="flex flex-col items-center gap-4">
     <button
      onClick={() => {
       processImage(defaultImage);
       setSelectedImage(defaultImage);
      }}
      className={`bg-gradient-to-r ${currentTheme.button} text-white px-6 py-3 rounded-full shadow-lg transition`}
     >
      Usar Nossa Foto Especial
     </button>
     <div className="flex items-center gap-2 my-2">
      <div className="h-px bg-white/30 w-16"></div>
      <span className={currentTheme.text}>ou</span>
      <div className="h-px bg-white/30 w-16"></div>
     </div>
     <label
      className={`bg-white/20 ${currentTheme.text} px-6 py-3 rounded-full cursor-pointer shadow-lg backdrop-blur-sm`}
     >
      📂 Escolher Outra Imagem
      <input
       type="file"
       accept="image/*"
       onChange={handleImageUpload}
       className="hidden"
      />
     </label>
    </div>
   ) : (
    <div className="relative w-full max-w-4xl">
     {pieces.length > 0 && (
      <PuzzleBoard pieces={pieces} onChange={checkCompletion} theme={theme} />
     )}

     {isComplete && (
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl"
      >
       <motion.p
        className={`text-2xl font-bold ${currentTheme.text} bg-white/20 p-4 rounded-xl backdrop-blur-sm`}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
       >
        Você montou nosso amor perfeito! ❤️
       </motion.p>
      </motion.div>
     )}
    </div>
   )}
  </motion.div>
 );
}
