// src/app/page.tsx

"use client"; // Adicione isso no topo do arquivo

import dynamic from "next/dynamic";
import React from "react";
import Puzzle from "@/components/Puzzle";

const HibiscusFlower = dynamic(() => import("@/components/HibiscusFlower"), {
 ssr: false, // Desativa a renderização no lado do servidor
 loading: () => (
  <div className="min-h-screen flex items-center justify-center">
   Carregando...
  </div>
 ),
});

export default function Home() {
 return (
  <main>
   <Puzzle />
   <HibiscusFlower />
  </main>
 );
}
