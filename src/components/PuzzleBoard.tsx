"use client";

import { Stage, Layer } from "react-konva";
import { PuzzlePiece } from "./PuzzlePiece";
import { motion } from "framer-motion";

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
 onChange?: (updatedPieces: PuzzlePieceData[]) => void;
 theme: "normal" | "gótica" | "rabuda" | "ecleticballs";
};

export function PuzzleBoard({ pieces, onChange, theme }: PuzzleBoardProps) {
 const handlePieceMove = (index: number, newX: number, newY: number) => {
  const updatedPieces = [...pieces];
  updatedPieces[index] = {
   ...updatedPieces[index],
   x: newX,
   y: newY,
  };

  if (onChange) {
   onChange(updatedPieces);
  }
 };

 const getBorderColor = () => {
  switch (theme) {
   case "gótica":
    return "border-purple-800";
   case "rabuda":
    return "border-pink-500";
   case "ecleticballs":
    return "border-green-500";
   default:
    return "border-blue-300";
  }
 };

 return (
  <motion.div
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   className={`rounded-2xl overflow-hidden shadow-md border-4 ${getBorderColor()} transition-colors duration-300`}
  >
   <Stage width={800} height={600} className="bg-white/90 backdrop-blur-sm">
    <Layer>
     {pieces.map((piece, idx) => (
      <PuzzlePiece
       key={idx}
       src={piece.src}
       width={piece.width}
       height={piece.height}
       x={piece.x}
       y={piece.y}
       correctX={piece.correctX}
       correctY={piece.correctY}
       onDragEnd={(pos) => handlePieceMove(idx, pos.x, pos.y)}
       theme={theme}
      />
     ))}
    </Layer>
   </Stage>
  </motion.div>
 );
}
