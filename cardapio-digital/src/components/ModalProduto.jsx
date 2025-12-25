// ========================================
// ✏️ COMPONENTE: MODAL PRODUTO
// ========================================
// Modal utilizado para ADICIONAR e EDITAR produtos
//
// Responsável por:
// - Exibir formulário de produto
// - Controlar edição de nome, descrição, preço e imagem
// - Validar tamanho da imagem
// - Gerar preview da imagem
// - Disparar ação de salvar produto
//
// Importante:
// - NÃO possui estado próprio
// - Produto e alterações são controlados pelo App.jsx
// - Este componente é usado apenas em modo ADMIN
// ========================================

import React from 'react';

// Ícones usados nos botões do modal
import { X, Save } from 'lucide-react';

// Configurações globais (ex: limite de imagem)
import { CONFIG } from '../config/configuracoes';

export const ModalProduto = ({
  mostrar,          // Controla se o modal está visível
  modoEdicao,       // 'adicionar' | 'editar'
  produto,          // Objeto do produto sendo editado
  onChangeProduto,  // Função para atualizar produto (controlado pelo pai)
  onSalvar,         // Função para salvar produto
  onFechar,         // Função para fechar o modal
}) => {

  // -------------------------------
  // ❌ Não renderiza se:
  // - Modal não estiver visível
  // - Produto não estiver carregado
  // -------------------------------
  if (!mostrar || !produto) return null;

  // -------------------------------
  // 📁 Upload e leitura de imagem
  // -------------------------------
  // - Valida tamanho máximo configurado
  // - Converte imagem para Base64
  // - Atualiza produto no estado do componente pai
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {

      // Validação de tamanho da imagem
      if (file.size > CONFIG.avancado.limiteImagemMB * 1024 * 1024) {
        alert(`Imagem muito grande! Máximo ${CONFIG.avancado.limiteImagemMB}MB.`);
        e.target.value = '';
        return;
      }

      // Leitura da imagem para preview e salvamento
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangeProduto({ 
          ...produto, 
          imagem: reader.result 
        });
      };
      reader.readAsDataURL(file);
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
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200">

        {/* ===============================
            🔝 HEADER DO MODAL
            ===============================
            - Título muda conforme modo de edição
            - Botão de fechar
        */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {modoEdicao === 'adicionar'
              ? '➕ Adicionar Produto'
              : '✏️ Editar Produto'}
          </h2>

          <button 
            onClick={onFechar} 
            className="text-gray-500 hover:text-gray-900 transition"
          >
            <X size={28} />
          </button>
        </div>
        
        {/* ===============================
            📋 FORMULÁRIO DO PRODUTO
            =============================== */}
        <div className="space-y-4">

          {/* ===============================
              🏷️ NOME DO PRODUTO
              =============================== */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome do Produto
            </label>
            <input
              type="text"
              value={produto.nome}
              onChange={(e) =>
                onChangeProduto({ 
                  ...produto, 
                  nome: e.target.value 
                })
              }
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500"
              placeholder="Ex: X-Bacon Especial"
            />
          </div>

          {/* ===============================
              📝 DESCRIÇÃO DO PRODUTO
              =============================== */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              value={produto.descricao}
              onChange={(e) =>
                onChangeProduto({ 
                  ...produto, 
                  descricao: e.target.value 
                })
              }
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500"
              placeholder="Ex: Pão, hambúrguer 150g, bacon, queijo..."
              rows="3"
            />
          </div>

          {/* ===============================
              💰 PREÇO DO PRODUTO
              =============================== */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={produto.preco}
              onChange={(e) =>
                onChangeProduto({ 
                  ...produto, 
                  preco: parseFloat(e.target.value) 
                })
              }
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500"
              placeholder="Ex: 22.90"
            />
          </div>

          {/* ===============================
              🖼️ IMAGEM DO PRODUTO
              ===============================
              - Upload local
              - Validação de tamanho
              - Preview automático
          */}
          {/* Imagem */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imagem do Produto
            </label>
            
            {/* Botões de escolha */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Botão Galeria */}
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition">
                  <svg className="w-12 h-12 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-blue-600">📁 Escolher da Galeria</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Botão Câmera */}
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center bg-green-50 border-2 border-green-200 hover:border-green-400 rounded-xl p-4 transition">
                  <svg className="w-12 h-12 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-green-600">📸 Tirar Foto</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Botão Limpar (só aparece se tiver imagem) */}
            {produto.imagem && (
              <button
                type="button"
                onClick={() => onChangeProduto({ ...produto, imagem: '' })}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition border border-red-200 font-semibold"
              >
                🗑️ Remover Imagem
              </button>
            )}

            <p className="text-xs text-gray-500 mt-2">
              📁 JPG, PNG, WEBP | Max: {CONFIG.avancado.limiteImagemMB}MB
            </p>
            <p className="text-xs text-blue-600 mt-1">
              💡 Dica: Comprima imagens grandes em tinypng.com
            </p>
          </div>

          {/* ===============================
              👀 PREVIEW DA IMAGEM
              ===============================
              - Exibido apenas se houver imagem
              - Fallback caso imagem seja inválida
          */}
          {produto.imagem && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ✅ Preview
              </label>

              <div className="relative">
                <img 
                  src={produto.imagem} 
                  alt="Preview" 
                  className="w-full h-64 object-cover rounded-xl border-4 border-green-500"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/400x300?text=Imagem+Invalida';
                    alert('Erro ao carregar imagem!');
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ===============================
            🔘 BOTÕES DE AÇÃO
            =============================== */}
        <div className="flex gap-4 mt-6">

          {/* Cancela edição e fecha modal */}
          <button
            onClick={onFechar}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition font-semibold border border-gray-200"
          >
            Cancelar
          </button>

          {/* Salva produto (adicionar ou editar) */}
          <button
            onClick={onSalvar}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-semibold flex items-center justify-center gap-2 shadow-xl"
          >
            <Save size={20} />
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
