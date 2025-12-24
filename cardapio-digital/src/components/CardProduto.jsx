// ========================================
// 🍔 COMPONENTE: CARD DO PRODUTO
// ========================================
// Responsável por exibir UM produto individual
// no cardápio.
//
// Funções principais:
// - Exibir imagem, nome, descrição e preço
// - Permitir adicionar/remover quantidade no carrinho
// - Exibir controles diferentes para CLIENTE e ADMIN
// - Permitir edição e exclusão no modo administrador
//
// Observação:
// Este componente NÃO gerencia estado próprio.
// Toda a lógica vem do componente pai (App / Lista).
// ========================================

import React from 'react';

// Ícones utilizados no card
import { Plus, Minus, Edit, Trash2 } from 'lucide-react';

export const CardProduto = ({
  produto,                 // Objeto do produto (id, nome, preço, imagem, etc)
  categoria,               // Categoria do produto (ex: hamburgueres, bebidas)
  isAdmin,                 // Indica se o usuário é administrador
  quantidadeNoCarrinho,    // Quantidade atual desse produto no carrinho
  onAdicionar,             // Função para adicionar o produto ao carrinho
  onAumentar,              // Função para aumentar a quantidade
  onDiminuir,              // Função para diminuir a quantidade
  onEditar,                // Função para editar produto (admin)
  onDeletar,               // Função para deletar produto (admin)
}) => {
  return (
    // ===============================
    // 📦 CARD PRINCIPAL
    // ===============================
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 relative border border-gray-200">

      {/* ===============================
          🔐 BOTÕES DE ADMIN
          ===============================
          Só aparecem se isAdmin === true
      */}
      {isAdmin && (
        <div className="absolute top-3 right-3 z-10 flex gap-2">

          {/* Botão Editar */}
          <button
            onClick={() => onEditar(produto)}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-lg"
            title="Editar produto"
          >
            <Edit size={16} />
          </button>

          {/* Botão Deletar */}
          <button
            onClick={() => onDeletar(produto)}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
            title="Deletar produto"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
      
      {/* ===============================
          🖼️ IMAGEM DO PRODUTO
          =============================== */}
      <div className="relative">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="w-full h-52 object-cover" 
        />

        {/* Gradiente para melhorar contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40"></div>
      </div>
      
      {/* ===============================
          📝 CONTEÚDO DO CARD
          =============================== */}
      <div className="p-5">

        {/* Nome */}
        <h3 className="font-bold text-xl text-gray-800 mb-2">
          {produto.nome}
        </h3>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {produto.descricao}
        </p>
        
        {/* ===============================
            💰 PREÇO
            ===============================
            A cor muda conforme a categoria
        */}
        <div className="flex justify-between items-center mb-4">
          <span
            className={`text-3xl font-bold ${
              categoria === 'hamburgueres'
                ? 'text-red-600'
                : 'text-blue-600'
            }`}
          >
            R$ {produto.preco.toFixed(2)}
          </span>
        </div>

        {/* ===============================
            ➕ BOTÃO ADICIONAR / CONTADOR
            ===============================
            - Se quantidade = 0 → botão "Adicionar"
            - Se quantidade > 0 → controles + e -
        */}
        {quantidadeNoCarrinho === 0 ? (

          // ---------- Botão Adicionar ----------
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

          // ---------- Controles de Quantidade ----------
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-2 shadow-inner">

            {/* Diminuir */}
            <button
              onClick={() => onDiminuir(produto.id)}
              className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition shadow-md"
            >
              <Minus size={20} />
            </button>
            
            {/* Quantidade Atual */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 uppercase font-semibold">
                Quantidade
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {quantidadeNoCarrinho}
              </span>
            </div>
            
            {/* Aumentar */}
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
