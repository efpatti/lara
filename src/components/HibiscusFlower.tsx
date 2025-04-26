// components/HibiscusFlower.tsx
import React from "react";
import { motion, SVGMotionProps } from "framer-motion";
import { PetalVariants, StemVariants } from "../types/animation";

const HibiscusFlower: React.FC = () => {
 // Animação para a pétala
 const petalVariants: PetalVariants = {
  initial: { rotate: 0 },
  animate: {
   rotate: [0, 5, -5, 0],
   transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
   },
  },
 };

 // Animação para o caule
 const stemVariants: StemVariants = {
  initial: { rotate: 0 },
  animate: {
   rotate: [0, 1, -1, 0],
   transition: {
    duration: 5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
   },
  },
 };

 // Componente de pétala com tipos corretos
 const Petal: React.FC<SVGMotionProps<SVGPathElement>> = (props) => (
  <motion.path {...props} />
 );

 // Componente de folha com tipos corretos
 // Dentro do HibiscusFlower.tsx

 const Leaf: React.FC<{
  d: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string | number;
  custom: number;
 }> = ({ d, fill, stroke, strokeWidth, custom }) => (
  <motion.g
   initial="initial"
   animate={{
    rotate: [0, 3, 0],
    transition: {
     duration: 4,
     repeat: Infinity,
     repeatType: "reverse",
     ease: "easeInOut",
     delay: custom * 0.5, // se quiser usar o custom pra delay
    },
   }}
  >
   <motion.path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
  </motion.g>
 );

 return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-green-50 p-4">
   <motion.svg
    width="300"
    height="400"
    viewBox="0 0 300 400"
    initial="initial"
    animate="animate"
    className="drop-shadow-lg"
   >
    {/* Caule */}
    <motion.path
     d="M150,400 C150,350 150,250 150,200"
     stroke="#2E8B57"
     strokeWidth="8"
     fill="transparent"
     variants={stemVariants}
    />

    {/* Folhas */}
    <Leaf
     d="M150,300 C180,280 200,260 180,240 C160,220 150,240 150,250"
     fill="#3CB371"
     stroke="#2E8B57"
     strokeWidth="2"
     custom={1}
    />

    <Leaf
     d="M150,280 C120,260 100,240 120,220 C140,200 150,220 150,230"
     fill="#3CB371"
     stroke="#2E8B57"
     strokeWidth="2"
     custom={2}
    />

    {/* Centro da flor */}
    <circle cx="150" cy="150" r="15" fill="#FFD700" />
    <circle cx="150" cy="150" r="10" fill="#8B4513" />

    {/* Pétalas */}
    <motion.g variants={petalVariants}>
     <Petal
      d="M150,120 C160,100 180,90 190,110 C200,130 180,140 170,140 C160,140 150,130 150,120"
      fill="#FF1493"
      stroke="#C71585"
      strokeWidth="2"
     />

     <Petal
      d="M150,180 C160,200 180,210 190,190 C200,170 180,160 170,160 C160,160 150,170 150,180"
      fill="#FF1493"
      stroke="#C71585"
      strokeWidth="2"
     />

     <Petal
      d="M120,150 C100,160 90,180 110,190 C130,200 140,180 140,170 C140,160 130,150 120,150"
      fill="#FF1493"
      stroke="#C71585"
      strokeWidth="2"
     />

     <Petal
      d="M180,150 C200,160 210,180 190,190 C170,200 160,180 160,170 C160,160 170,150 180,150"
      fill="#FF1493"
      stroke="#C71585"
      strokeWidth="2"
     />

     <Petal
      d="M170,120 C190,130 200,150 180,160 C160,170 150,150 150,140 C150,130 160,120 170,120"
      fill="#FF69B4"
      stroke="#C71585"
      strokeWidth="1"
     />

     <Petal
      d="M130,120 C110,130 100,150 120,160 C140,170 150,150 150,140 C150,130 140,120 130,120"
      fill="#FF69B4"
      stroke="#C71585"
      strokeWidth="1"
     />

     <Petal
      d="M170,180 C190,170 200,150 180,140 C160,130 150,150 150,160 C150,170 160,180 170,180"
      fill="#FF69B4"
      stroke="#C71585"
      strokeWidth="1"
     />

     <Petal
      d="M130,180 C110,170 100,150 120,140 C140,130 150,150 150,160 C150,170 140,180 130,180"
      fill="#FF69B4"
      stroke="#C71585"
      strokeWidth="1"
     />
    </motion.g>
   </motion.svg>
  </div>
 );
};

export default HibiscusFlower;
