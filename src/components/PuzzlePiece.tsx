// src/components/PuzzlePiece.tsx
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
 onSnap: () => void;
};

export function PuzzlePiece({
 src,
 width,
 height,
 x,
 y,
 correctX,
 correctY,
 onSnap,
}: PuzzlePieceProps) {
 const [image, setImage] = useState<HTMLImageElement | null>(null);
 const [position, setPosition] = useState({ x, y });

 useEffect(() => {
  const img = new window.Image();
  img.src = src;
  img.onload = () => setImage(img);
 }, [src]);

 const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
  const newX = e.target.x();
  const newY = e.target.y();
  const dx = Math.abs(newX - correctX);
  const dy = Math.abs(newY - correctY);

  if (dx < 20 && dy < 20) {
   setPosition({ x: correctX, y: correctY });
   onSnap();
  } else {
   setPosition({ x: newX, y: newY });
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
    />
   )}
  </>
 );
}
