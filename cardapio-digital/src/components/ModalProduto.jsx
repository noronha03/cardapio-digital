// ========================================
// ✏️ COMPONENTE: MODAL PRODUTO
// ========================================
// Modal para adicionar/editar produtos

import React from 'react';
import { X, Save } from 'lucide-react';
import { CONFIG } from '../config/configuracoes';

export const ModalProduto = ({
  mostrar,
  modoEdicao,
  produto,
  onChangeProduto,
  onSalvar,
  onFechar,
}) => {
  if (!mostrar || !produto) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > CONFIG.avancado.limiteImagemMB * 1024 * 1024) {
        alert(`Imagem muito grande! Máximo ${CONFIG.avancado.limiteImagemMB}MB.`);
        e.target.value = '';
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangeProduto({ ...produto, imagem: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {modoEdicao === 'adicionar' ? '➕ Adicionar Produto' : '✏️ Editar Produto'}
          </h2>
          <button 
            onClick={onFechar} 
            className="text-gray-500 hover:text-gray-900 transition"
          >
            <X size={28} />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome do Produto
            </label>
            <input
              type="text"
              value={produto.nome}
              onChange={(e) => onChangeProduto({ ...produto, nome: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500"
              placeholder="Ex: X-Bacon Especial"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              value={produto.descricao}
              onChange={(e) => onChangeProduto({ ...produto, descricao: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500"
              placeholder="Ex: Pão, hambúrguer 150g, bacon, queijo..."
              rows="3"
            />
          </div>

          {/* Preço */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={produto.preco}
              onChange={(e) => onChangeProduto({ ...produto, preco: parseFloat(e.target.value) })}
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500"
              placeholder="Ex: 22.90"
            />
          </div>

          {/* Imagem */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imagem do Produto
            </label>
            <div className="flex gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex-1 px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onChangeProduto({ ...produto, imagem: '' })}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition border border-gray-200"
              >
                Limpar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              📁 JPG, PNG, WEBP | Max: {CONFIG.avancado.limiteImagemMB}MB | Dica: comprima em tinypng.com
            </p>
          </div>

          {/* Preview da Imagem */}
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
                    e.target.src = 'https://via.placeholder.com/400x300?text=Imagem+Invalida';
                    alert('Erro ao carregar imagem!');
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onFechar}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition font-semibold border border-gray-200"
          >
            Cancelar
          </button>
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