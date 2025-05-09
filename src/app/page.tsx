// src/app/page.tsx

"use client";

import dynamic from "next/dynamic";
import React from "react";

const Game = dynamic(() => import("@/components/Game"), {
 ssr: false, // Desativa a renderização no lado do servidor
 loading: () => (
  <div className="min-h-screen flex items-center justify-center">
   Carregando...
  </div>
 ),
});

export default function Home() {
 return (
  <main className="flex h-screen w-full justify-center items-center">
   <Game />
  </main>
 );
}
