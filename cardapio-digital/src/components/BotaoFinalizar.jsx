// ========================================
// 🎯 COMPONENTE: BOTÃO FINALIZAR PEDIDO
// ========================================
// Botão flutuante exibido na parte inferior
// da tela para facilitar o acesso ao carrinho.
//
// Funções principais:
// - Incentivar o cliente a finalizar o pedido
// - Exibir quantidade total de itens no carrinho
// - Melhorar a usabilidade em dispositivos móveis
//
// Observações:
// - NÃO aparece se o carrinho estiver vazio
// - NÃO aparece se o carrinho já estiver aberto
// - Não possui estado próprio
// ========================================

import React from 'react';

// Ícone do carrinho
import { ShoppingCart } from 'lucide-react';

export const BotaoFinalizar = ({ 
  totalItens,        // Quantidade total de itens no carrinho
  onClick,           // Função executada ao clicar (abrir carrinho)
  mostrarCarrinho    // Indica se o carrinho já está visível
}) => {

  // ===============================
  // 🚫 REGRAS DE EXIBIÇÃO
  // ===============================
  // - Se não houver itens no carrinho
  // - Ou se o carrinho já estiver aberto
  // O botão NÃO é renderizado
  if (totalItens === 0 || mostrarCarrinho) return null;

  return (
    // ===============================
    // 📍 CONTAINER FLUTUANTE
    // ===============================
    // Fica fixo na parte inferior da tela
    <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4">

      {/* ===============================
          🟢 BOTÃO DE AÇÃO
          =============================== */}
      <button
        onClick={onClick}
        className="
          bg-gradient-to-r from-green-600 to-emerald-600
          hover:from-green-700 hover:to-emerald-700
          text-white
          px-6 md:px-8
          py-3 md:py-4
          rounded-full
          shadow-2xl
          flex items-center gap-2 md:gap-3
          font-bold text-base md:text-lg
          transition-all
          animate-pulse hover:animate-none
          max-w-xs md:max-w-md
        "
      >
        {/* Ícone do carrinho */}
        <ShoppingCart size={24} className="flex-shrink-0" />

        {/* Texto do botão (responsivo) */}
        <span className="hidden sm:inline">
          Finalizar Pedido
        </span>
        <span className="sm:hidden">
          Finalizar
        </span>

        {/* Badge com total de itens */}
        <span className="
          bg-white text-green-600
          px-2 md:px-3
          py-0.5 md:py-1
          rounded-full
          text-xs md:text-sm
          font-extrabold
          flex-shrink-0
        ">
          {totalItens}
        </span>
      </button>
    </div>
  );
};
