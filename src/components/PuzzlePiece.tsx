"use client";

import { Image as KonvaImage } from "react-konva";
import { useEffect, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";

type PuzzlePieceProps = {
 src: string;
 width: number;
 height: number;
 x: number;
 y: number;
 correctX: number;
 correctY: number;
 onDragEnd?: (pos: { x: number; y: number }) => void;
 theme?: "normal" | "gótica" | "rabuda" | "ecleticballs";
};

export function PuzzlePiece({
 src,
 width,
 height,
 x,
 y,
 correctX,
 correctY,
 onDragEnd,
 theme = "normal",
}: PuzzlePieceProps) {
 const [image, setImage] = useState<HTMLImageElement | null>(null);
 const [position, setPosition] = useState({ x, y });
 const [isSnapped, setIsSnapped] = useState(false);

 // Efeito para carregar a imagem
 useEffect(() => {
  const img = new window.Image();
  img.src = src;
  img.onload = () => setImage(img);
 }, [src]);

 // Efeito para resetar posição quando a peça muda
 useEffect(() => {
  setPosition({ x, y });
  setIsSnapped(false);
 }, [x, y]);

 // Estilo baseado no tema
 const getShadowColor = () => {
  switch (theme) {
   case "gótica":
    return "rgba(147, 51, 234, 0.5)";
   case "rabuda":
    return "rgba(236, 72, 153, 0.5)";
   case "ecleticballs":
    return "rgba(16, 185, 129, 0.5)";
   default:
    return "rgba(59, 130, 246, 0.5)";
  }
 };

 const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
  const newX = e.target.x();
  const newY = e.target.y();
  const dx = Math.abs(newX - correctX);
  const dy = Math.abs(newY - correctY);

  if (dx < 20 && dy < 20) {
   // Snap to correct position
   setPosition({ x: correctX, y: correctY });
   setIsSnapped(true);
   if (onDragEnd) {
    onDragEnd({ x: correctX, y: correctY });
   }
  } else {
   setPosition({ x: newX, y: newY });
   setIsSnapped(false);
   if (onDragEnd) {
    onDragEnd({ x: newX, y: newY });
   }
  }
 };

 return (
  <>
   {image && (
    <KonvaImage
     image={image}
     width={width}
     height={height}
     x={position.x}
     y={position.y}
     draggable
     onDragEnd={handleDragEnd}
     shadowColor={getShadowColor()}
     shadowBlur={isSnapped ? 15 : 5}
     shadowOpacity={isSnapped ? 0.8 : 0.3}
     cornerRadius={8}
     onMouseEnter={(e) => {
      const container = e.target.getStage()?.container();
      if (container) {
       container.style.cursor = "grab";
      }
     }}
     onMouseLeave={(e) => {
      const container = e.target.getStage()?.container();
      if (container) {
       container.style.cursor = "default";
      }
     }}
    />
   )}
  </>
 );
}
