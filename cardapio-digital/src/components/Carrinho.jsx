// ========================================
// 🛒 COMPONENTE: CARRINHO
// ========================================
// Modal lateral do carrinho de compras

import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, Send } from 'lucide-react';
import { CONFIG } from '../config/configuracoes';

export const Carrinho = ({
  mostrar,
  carrinho,
  observacoes,
  onChangeObservacoes,
  onAumentar,
  onDiminuir,
  onRemover,
  onEnviarWhatsApp,
  onFechar,
  calcularTotal,
}) => {
  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end backdrop-blur-sm">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl border-l-4 border-orange-400">
        {/* Header do Carrinho */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">🛒 Seu Pedido</h2>
            <button
              onClick={onFechar}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {carrinho.length === 0 ? (
            // Carrinho Vazio
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-600 text-lg">Seu carrinho está vazio</p>
              <p className="text-gray-500 text-sm mt-2">Adicione itens deliciosos!</p>
            </div>
          ) : (
            // Carrinho com Itens
            <>
              {/* Lista de Itens */}
              {carrinho.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl p-4 mb-4 shadow border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {item.nome}
                      </h3>
                      <p className="text-red-600 font-semibold mt-1">
                        R$ {item.preco.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemover(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg transition"
                      title="Remover item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  {/* Controles de Quantidade */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                      <button
                        onClick={() => onDiminuir(item.id)}
                        className="bg-red-500 text-white hover:bg-red-600 w-9 h-9 rounded-lg flex items-center justify-center transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="font-bold text-xl text-gray-900 w-10 text-center">
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() => onAumentar(item.id)}
                        className="bg-green-600 text-white hover:bg-green-700 w-9 h-9 rounded-lg flex items-center justify-center transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Subtotal</p>
                      <p className="font-bold text-xl text-gray-900">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Seção de Finalização */}
              <div className="border-t-2 border-gray-200 pt-6 mt-6">
                {/* Campo de Observações */}
                {CONFIG.observacoes.habilitado && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {CONFIG.observacoes.label}
                    </label>
                    <textarea
                      value={observacoes}
                      onChange={(e) => onChangeObservacoes(e.target.value)}
                      placeholder={CONFIG.observacoes.placeholder}
                      className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500 text-sm resize-none"
                      rows="3"
                    />
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl">
                  <span className="text-xl font-bold text-gray-700">TOTAL:</span>
                  <span className="text-4xl font-bold text-red-600">
                    R$ {calcularTotal().toFixed(2)}
                  </span>
                </div>

                {/* Botão Enviar WhatsApp */}
                <button
                  onClick={onEnviarWhatsApp}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-xl font-bold text-xl hover:from-green-700 hover:to-emerald-700 transition shadow-2xl flex items-center justify-center gap-3"
                >
                  <Send size={26} />
                  Enviar Pedido via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};