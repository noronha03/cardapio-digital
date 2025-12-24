// ========================================
// 🎯 COMPONENTE: HEADER
// ========================================
// Responsável por:
// - Exibir o topo da aplicação
// - Mostrar nome e slogan da loja
// - Indicar mesa atual (quando acesso via QR Code)
// - Controlar acesso admin (login / logout)
// - Abrir carrinho e modal de QR Codes
//
// Importante:
// - NÃO possui estado próprio
// - Todas as ações são controladas pelo App.jsx via props
// ========================================

import React from 'react';

// Ícones utilizados nos botões do header
import { ShoppingCart, Lock, LogOut } from 'lucide-react';

// Configurações globais da loja (nome, slogan, etc)
import { CONFIG } from '../config/configuracoes';

export const Header = ({ 
  mesaAtual,          // Número da mesa (null quando acesso não é por QR Code)
  isAdmin,            // Define se o usuário está logado como administrador
  contadorCarrinho,  // Quantidade total de itens no carrinho
  onAbrirCarrinho,   // Função para abrir o carrinho
  onAbrirLogin,      // Função para abrir o login admin
  onLogout,          // Função para sair do modo admin
  onAbrirQRCodes,    // Função para abrir o modal de QR Codes
}) => {

  return (
    // Header fixo no topo com gradiente e sombra
    <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl sticky top-0 z-50 border-b-4 border-orange-400">
      <div className="container mx-auto px-4 py-6">

        {/* ===============================
            📍 BADGE DA MESA
            ===============================
            - Exibido apenas quando o cliente acessa via QR Code
            - Não aparece para admin
        */}
        {mesaAtual && (
          <div className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl mb-4 text-center font-bold text-lg shadow-xl animate-pulse">
            📍 MESA {mesaAtual}
          </div>
        )}
        
        <div className="flex justify-between items-center">

          {/* ===============================
              🏪 LOGO E IDENTIDADE DA LOJA
              ===============================
              - Nome e slogan vêm do arquivo de configuração
              - Alterações devem ser feitas em config/configuracoes.js
          */}
          <div>
            <h1 className="text-4xl font-bold drop-shadow-lg text-white">
              {CONFIG.loja.nome}
            </h1>
            <p className="text-orange-100 text-sm mt-1">
              {CONFIG.loja.slogan}
            </p>
          </div>
        
          {/* ===============================
              🔘 BOTÕES DE AÇÃO
              =============================== */}
          <div className="flex items-center gap-3">

            {/* ===============================
                🔲 BOTÃO QR CODES
                ===============================
                - Visível apenas para admin
                - Não aparece quando há mesa ativa
                - Abre modal para geração/visualização dos QR Codes
            */}
            {!mesaAtual && isAdmin && (
              <button
                onClick={onAbrirQRCodes}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition shadow-lg flex items-center gap-2"
              >
                <span className="text-xl">🔲</span>
                <span className="hidden md:inline">QR Codes</span>
              </button>
            )}

            {/* ===============================
                🔐 BOTÃO ADMIN / 🚪 LOGOUT
                ===============================
                - Exibido apenas quando NÃO há mesa ativa
                - Alterna entre Login e Logout conforme estado isAdmin
            */}
            {!mesaAtual && !isAdmin ? (
              // Botão para abrir login admin
              <button
                onClick={onAbrirLogin}
                className="bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition shadow-lg flex items-center gap-2 font-semibold"
              >
                <Lock size={18} />
                <span className="hidden md:inline">Admin</span>
              </button>
            ) : !mesaAtual && isAdmin ? (
              // Botão para sair do modo admin
              <button
                onClick={onLogout}
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition shadow-lg flex items-center gap-2 font-semibold"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Sair</span>
              </button>
            ) : null}

            {/* ===============================
                🛒 BOTÃO DO CARRINHO
                ===============================
                - Sempre visível
                - Abre o carrinho ao clicar
                - Exibe contador animado quando há itens
            */}
            <button
              onClick={onAbrirCarrinho}
              className="relative bg-white text-orange-600 p-3 rounded-full hover:bg-orange-50 transition shadow-xl"
            >
              <ShoppingCart size={24} />

              {/* Contador de itens do carrinho */}
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
