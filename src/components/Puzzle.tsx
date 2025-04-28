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
  <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-6">
   <h1 className="text-3xl font-bold">Quebra-Cabeça</h1>

   <button
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    onClick={() => fileInputRef.current?.click()}
   >
    Escolher imagem
   </button>

   <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
    ref={fileInputRef}
   />

   {pieces.length > 0 && <PuzzleBoard pieces={pieces} />}
  </main>
 );
}
