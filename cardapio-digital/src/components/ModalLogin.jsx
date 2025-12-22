// ========================================
// 🔐 COMPONENTE: MODAL LOGIN ADMIN
// ========================================

import React from 'react';
import { X } from 'lucide-react';
import { CONFIG } from '../config/configuracoes';

export const ModalLogin = ({
  mostrar,
  senhaDigitada,
  onChangeSenha,
  onLogin,
  onFechar,
}) => {
  if (!mostrar) return null;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">🔐 Login Admin</h2>
          <button 
            onClick={onFechar} 
            className="text-gray-500 hover:text-gray-900 transition"
          >
            <X size={28} />
          </button>
        </div>
        
        <input
          type="password"
          placeholder="Digite a senha"
          value={senhaDigitada}
          onChange={(e) => onChangeSenha(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-4 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl mb-4 focus:outline-none focus:border-red-500 placeholder-gray-400"
          autoFocus
        />
        
        <button
          onClick={onLogin}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl hover:from-red-700 hover:to-orange-700 transition font-bold text-lg shadow-xl"
        >
          Entrar
        </button>
        
        <p className="text-sm text-gray-600 mt-4 text-center">
          Senha padrão: {CONFIG.admin.senha}
        </p>
      </div>
    </div>
  );
};