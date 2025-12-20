// ========================================
// 🎯 COMPONENTE: HEADER
// ========================================

import React from 'react';
import { ShoppingCart, Lock, LogOut } from 'lucide-react';
import { CONFIG } from '../config/configuracoes';

export const Header = ({ 
  mesaAtual, 
  isAdmin, 
  contadorCarrinho,
  onAbrirCarrinho,
  onAbrirLogin,
  onLogout,
  onAbrirQRCodes,
}) => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl sticky top-0 z-50 border-b-4 border-orange-400">
      <div className="container mx-auto px-4 py-6">
        {/* Badge da Mesa */}
        {mesaAtual && (
          <div className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl mb-4 text-center font-bold text-lg shadow-xl animate-pulse">
            📍 MESA {mesaAtual}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          {/* Logo e Nome */}
          <div>
            <h1 className="text-4xl font-bold drop-shadow-lg text-white">
              {CONFIG.loja.nome}
            </h1>
            <p className="text-orange-100 text-sm mt-1">
              {CONFIG.loja.slogan}
            </p>
          </div>
        
          {/* Botões de Ação */}
          <div className="flex items-center gap-3">
            {/* Botão QR Codes (só admin e sem mesa) */}
            {!mesaAtual && isAdmin && (
              <button
                onClick={onAbrirQRCodes}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition shadow-lg flex items-center gap-2"
              >
                <span className="text-xl">🔲</span>
                <span className="hidden md:inline">QR Codes</span>
              </button>
            )}

            {/* Botão Admin/Logout (só sem mesa) */}
            {!mesaAtual && !isAdmin ? (
              <button
                onClick={onAbrirLogin}
                className="bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition shadow-lg flex items-center gap-2 font-semibold"
              >
                <Lock size={18} />
                <span className="hidden md:inline">Admin</span>
              </button>
            ) : !mesaAtual && isAdmin ? (
              <button
                onClick={onLogout}
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition shadow-lg flex items-center gap-2 font-semibold"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Sair</span>
              </button>
            ) : null}

            {/* Botão Carrinho (sempre visível) */}
            <button
              onClick={onAbrirCarrinho}
              className="relative bg-white text-orange-600 p-3 rounded-full hover:bg-orange-50 transition shadow-xl"
            >
              <ShoppingCart size={24} />
              {contadorCarrinho > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
                  {contadorCarrinho}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};