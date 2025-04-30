// src/components/PuzzleBoard.tsx
"use client";

import { Stage, Layer } from "react-konva";
import { PuzzlePiece } from "./PuzzlePiece";

export type PuzzlePieceData = {
 src: string;
 width: number;
 height: number;
 x: number;
 y: number;
 correctX: number;
 correctY: number;
};

type PuzzleBoardProps = {
 pieces: PuzzlePieceData[];
};

export function PuzzleBoard({ pieces }: PuzzleBoardProps) {
 const handleSnap = () => {
  console.log("Peça encaixada!");
 };
 return (
  <div className="rounded-2xl overflow-hidden shadow-md border-4 border-blue-200">
   <Stage width={800} height={600} className="bg-white">
    <Layer>
     {pieces.map((piece, idx) => (
      <PuzzlePiece key={idx} {...piece} onSnap={handleSnap} />
     ))}
    </Layer>
   </Stage>
  </div>
 );
}
