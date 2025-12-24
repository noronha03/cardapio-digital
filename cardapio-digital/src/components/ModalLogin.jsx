// ========================================
// 🔐 COMPONENTE: MODAL LOGIN ADMIN
// ========================================
// Modal responsável pela autenticação do
// administrador do sistema.
//
// Funções principais:
// - Permitir acesso ao modo administrador
// - Controlar exibição do login
// - Validar senha digitada
//
// Observações importantes:
// - NÃO possui autenticação real (backend)
// - A validação da senha ocorre no componente pai
// - Indicado apenas para uso local / interno
// ========================================

import React from 'react';

// Ícone para fechar o modal
import { X } from 'lucide-react';

// Configurações globais (senha admin)
import { CONFIG } from '../config/configuracoes';

export const ModalLogin = ({
  mostrar,          // Controla se o modal está visível
  senhaDigitada,    // Valor digitado no input de senha
  onChangeSenha,    // Atualiza a senha digitada
  onLogin,          // Função executada ao tentar login
  onFechar,         // Fecha o modal
}) => {

  // ===============================
  // 🚫 CONTROLE DE VISIBILIDADE
  // ===============================
  // Se o modal não estiver ativo,
  // não renderiza nada na tela
  if (!mostrar) return null;

  // ===============================
  // ⌨️ LOGIN VIA TECLA ENTER
  // ===============================
  // Permite login ao pressionar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  };

  return (
    // ===============================
    // 🌓 OVERLAY DO MODAL
    // ===============================
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">

      {/* ===============================
          📦 CONTAINER DO MODAL
          =============================== */}
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200">

        {/* ===============================
            🔝 CABEÇALHO
            =============================== */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            🔐 Login Admin
          </h2>

          <button 
            onClick={onFechar}
            className="text-gray-500 hover:text-gray-900 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* ===============================
            🔑 INPUT DE SENHA
            =============================== */}
        <input
          type="password"
          placeholder="Digite a senha"
          value={senhaDigitada}
          onChange={(e) => onChangeSenha(e.target.value)}
          onKeyPress={handleKeyPress}
          className="
            w-full px-4 py-4
            bg-gray-100
            border-2 border-gray-200
            text-gray-900
            rounded-xl mb-4
            focus:outline-none focus:border-red-500
            placeholder-gray-400
          "
          autoFocus
        />

        {/* ===============================
            🔓 BOTÃO ENTRAR
            =============================== */}
        <button
          onClick={onLogin}
          className="
            w-full
            bg-gradient-to-r from-red-600 to-orange-600
            text-white
            py-4
            rounded-xl
            hover:from-red-700 hover:to-orange-700
            transition
            font-bold text-lg
            shadow-xl
          "
        >
          Entrar
        </button>

        {/* ===============================
            ℹ️ INFORMAÇÃO DE APOIO
            ===============================
            Útil apenas em ambiente de desenvolvimento
        */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Senha padrão: {CONFIG.admin.senha}
        </p>
      </div>
    </div>
  );
};
