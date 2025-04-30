// src/components/Puzzle.tsx
"use client";

import { useRef, useState } from "react";
import { PuzzlePieceData } from "@/components/PuzzleBoard";
import dynamic from "next/dynamic";

const PuzzleBoard = dynamic(
 () => import("@/components/PuzzleBoard").then((mod) => mod.PuzzleBoard),
 {
  ssr: false,
 }
);

export default function Puzzle() {
 const [pieces, setPieces] = useState<PuzzlePieceData[]>([]);
 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const imgURL = URL.createObjectURL(file);
  const img = new window.Image();
  img.src = imgURL;

  img.onload = () => {
   const rows = 3;
   const cols = 3;
   const boardWidth = 800;
   const boardHeight = 600;
   const pieceWidth = boardWidth / cols;
   const pieceHeight = boardHeight / rows;
   const tempPieces: PuzzlePieceData[] = [];

   // Redimensiona a imagem para o tamanho do tabuleiro
   const resizedCanvas = document.createElement("canvas");
   resizedCanvas.width = boardWidth;
   resizedCanvas.height = boardHeight;
   const resizedCtx = resizedCanvas.getContext("2d")!;
   resizedCtx.drawImage(img, 0, 0, boardWidth, boardHeight);

   const pieceCanvas = document.createElement("canvas");
   const pieceCtx = pieceCanvas.getContext("2d")!;
   pieceCanvas.width = pieceWidth;
   pieceCanvas.height = pieceHeight;

   for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
     pieceCtx.clearRect(0, 0, pieceWidth, pieceHeight);
     pieceCtx.drawImage(
      resizedCanvas,
      x * pieceWidth,
      y * pieceHeight,
      pieceWidth,
      pieceHeight,
      0,
      0,
      pieceWidth,
      pieceHeight
     );

     const dataUrl = pieceCanvas.toDataURL();

     tempPieces.push({
      src: dataUrl,
      width: pieceWidth,
      height: pieceHeight,
      x: Math.random() * 400 + 100, // gera um x aleatório melhor distribuído
      y: Math.random() * 400 + 100, // idem para y
      correctX: x * pieceWidth,
      correctY: y * pieceHeight,
     });
    }
   }

   setPieces(tempPieces);
  };
 };

 return (
  <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gradient-to-br from-blue-50 to-purple-100">
   <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
    Quebra-Cabeça
   </h1>

   <button
    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition shadow-lg"
    onClick={() => fileInputRef.current?.click()}
   >
    📂 Escolher Imagem
   </button>

   <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
    ref={fileInputRef}
   />

   <div className="mt-6 shadow-lg rounded-2xl p-4 bg-white">
    {pieces.length > 0 && <PuzzleBoard pieces={pieces} />}
   </div>
  </main>
 );
}
