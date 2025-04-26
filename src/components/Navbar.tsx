"use client";
import React, { useState } from "react";

const Navbar: React.FC = () => {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 return (
  <nav className="bg-white border-b border-[#48B5FB]/20 shadow-sm">
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
     {/* Logo */}
     <div className="flex items-center">
      <div className="flex-shrink-0">
       <h1 className="text-2xl font-cursive text-[#48B5FB]">
        Lara<span className="text-xs align-top opacity-70">♡</span>
       </h1>
      </div>
     </div>

     {/* Desktop Menu */}
     <div className="hidden md:block">
      <div className="ml-10 flex items-center space-x-8">
       <a
        href="#"
        className="text-[#48B5FB] hover:text-[#48B5FB]/80 transition-colors font-medium relative group"
       >
        Início
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#48B5FB] group-hover:w-full transition-all duration-300"></span>
       </a>
       <a
        href="#"
        className="text-gray-600 hover:text-[#48B5FB] transition-colors font-medium relative group"
       >
        Sobre
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#48B5FB] group-hover:w-full transition-all duration-300"></span>
       </a>
       <a
        href="#"
        className="text-gray-600 hover:text-[#48B5FB] transition-colors font-medium relative group"
       >
        Galeria
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#48B5FB] group-hover:w-full transition-all duration-300"></span>
       </a>
       <a
        href="#"
        className="text-gray-600 hover:text-[#48B5FB] transition-colors font-medium relative group"
       >
        Contato
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#48B5FB] group-hover:w-full transition-all duration-300"></span>
       </a>
      </div>
     </div>

     {/* Mobile menu button */}
     <div className="md:hidden">
      <button
       onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
       className="inline-flex items-center justify-center p-2 rounded-md text-[#48B5FB] hover:text-[#48B5FB]/80 focus:outline-none"
      >
       {mobileMenuOpen ? (
        <svg
         className="h-6 w-6"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
        >
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
         />
        </svg>
       ) : (
        <svg
         className="h-6 w-6"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
        >
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
         />
        </svg>
       )}
      </button>
     </div>
    </div>
   </div>

   {/* Mobile Menu */}
   {mobileMenuOpen && (
    <div className="md:hidden bg-white shadow-lg">
     <div className="px-2 pt-2 pb-3 space-y-1">
      <a
       href="#"
       className="block px-3 py-2 rounded-md text-base font-medium text-[#48B5FB] bg-[#48B5FB]/10"
      >
       Início
      </a>
      <a
       href="#"
       className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#48B5FB] hover:bg-[#48B5FB]/10"
      >
       Sobre
      </a>
      <a
       href="#"
       className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#48B5FB] hover:bg-[#48B5FB]/10"
      >
       Galeria
      </a>
      <a
       href="#"
       className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#48B5FB] hover:bg-[#48B5FB]/10"
      >
       Contato
      </a>
     </div>
    </div>
   )}
  </nav>
 );
};

export default Navbar;
