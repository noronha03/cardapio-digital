// ========================================
// 🎯 COMPONENTE: BOTÃO FINALIZAR PEDIDO
// ========================================
// Botão flutuante para finalizar pedido

import React from 'react';
import { ShoppingCart } from 'lucide-react';

export const BotaoFinalizar = ({ 
  totalItens, 
  onClick,
  mostrarCarrinho
}) => {
  // Não mostrar se não tiver itens ou se carrinho já estiver aberto
  if (totalItens === 0 || mostrarCarrinho) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4">
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-2xl flex items-center gap-2 md:gap-3 font-bold text-base md:text-lg transition-all animate-pulse hover:animate-none max-w-xs md:max-w-md"
      >
        <ShoppingCart size={24} className="flex-shrink-0" />
        <span className="hidden sm:inline">Finalizar Pedido</span>
        <span className="sm:hidden">Finalizar</span>
        <span className="bg-white text-green-600 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-extrabold flex-shrink-0">
          {totalItens}
        </span>
      </button>
    </div>
  );
};