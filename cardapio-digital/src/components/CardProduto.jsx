// ========================================
// 🍔 COMPONENTE: CARD DO PRODUTO
// ========================================

import React from 'react';
import { Plus, Minus, Edit, Trash2 } from 'lucide-react';

export const CardProduto = ({
  produto,
  categoria,
  isAdmin,
  quantidadeNoCarrinho,
  onAdicionar,
  onAumentar,
  onDiminuir,
  onEditar,
  onDeletar,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 relative border border-gray-200">
      {/* Botões Admin */}
      {isAdmin && (
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={() => onEditar(produto)}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-lg"
            title="Editar produto"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDeletar(produto)}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
            title="Deletar produto"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
      
      {/* Imagem */}
      <div className="relative">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="w-full h-52 object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40"></div>
      </div>
      
      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-800 mb-2">
          {produto.nome}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {produto.descricao}
        </p>
        
        {/* Preço */}
        <div className="flex justify-between items-center mb-4">
          <span className={`text-3xl font-bold ${
            categoria === 'hamburgueres' ? 'text-red-600' : 'text-blue-600'
          }`}>
            R$ {produto.preco.toFixed(2)}
          </span>
        </div>

        {/* Botão Adicionar / Contador */}
        {quantidadeNoCarrinho === 0 ? (
          <button
            onClick={() => onAdicionar(produto)}
            className={`w-full ${
              categoria === 'hamburgueres' 
                ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
            } text-white py-3 rounded-xl transition font-semibold flex items-center justify-center gap-2 shadow-lg`}
          >
            <Plus size={20} />
            Adicionar
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-2 shadow-inner">
            <button
              onClick={() => onDiminuir(produto.id)}
              className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition shadow-md"
            >
              <Minus size={20} />
            </button>
            
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 uppercase font-semibold">
                Quantidade
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {quantidadeNoCarrinho}
              </span>
            </div>
            
            <button
              onClick={() => onAumentar(produto.id)}
              className="bg-green-600 hover:bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center transition shadow-md"
            >
              <Plus size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 