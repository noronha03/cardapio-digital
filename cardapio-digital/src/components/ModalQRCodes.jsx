// ========================================
// 🔲 COMPONENTE: MODAL QR CODES
// ========================================
// Modal responsável por GERAR e EXIBIR QR Codes
// para cada mesa do estabelecimento.
//
// Funcionalidades principais:
// - Definir número de mesas
// - Gerar QR Code individual para cada mesa
// - Cada QR leva o cliente para o cardápio já
//   identificado com o número da mesa
// - Permite download individual e impressão em massa
//
// Observações importantes:
// - Uso exclusivo do ADMIN
// - QR Codes são gerados dinamicamente via API externa
// - Não há persistência, apenas geração visual
// ========================================

import React, { useState } from 'react';

// Ícone para botão de fechar
import { X } from 'lucide-react';

// Configurações globais (quantidade padrão e tamanho do QR)
import { CONFIG } from '../config/configuracoes';

export const ModalQRCodes = ({
  mostrar,   // Controla se o modal está visível
  onFechar,  // Função para fechar o modal
}) => {

  // -------------------------------
  // 🔢 Estado local:
  // Quantidade de mesas que terão QR Code
  // -------------------------------
  const [numeroMesas, setNumeroMesas] = useState(
    CONFIG.qrCodes.mesasPadrao
  );

  // Se o modal não estiver visível, não renderiza nada
  if (!mostrar) return null;

  return (
    // ===============================
    // 🌓 OVERLAY DO MODAL
    // ===============================
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">

      {/* ===============================
          📦 CONTAINER PRINCIPAL
          =============================== */}
      <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-blue-200">

        {/* ===============================
            🔝 CABEÇALHO DO MODAL
            =============================== */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-900">
            🔲 Gerador de QR Codes
          </h2>

          <button 
            onClick={onFechar} 
            className="text-blue-700 hover:text-blue-900 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* ===============================
            📋 INSTRUÇÕES DE USO
            ===============================
            Orientação simples para o cliente/admin
        */}
        <div className="bg-blue-100 bg-opacity-60 border-2 border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-blue-900 mb-2">
            📋 Como usar:
          </h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Defina quantas mesas você tem</li>
            <li>Baixe os QR Codes</li>
            <li>Imprima e cole nas mesas</li>
            <li>Clientes escaneiam e o pedido vem identificado!</li>
          </ol>
        </div>

        {/* ===============================
            🔢 INPUT DE NÚMERO DE MESAS
            ===============================
            - Limite mínimo: 1
            - Limite máximo: 100 (segurança visual)
        */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Quantas mesas?
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={numeroMesas}
            onChange={(e) =>
              setNumeroMesas(parseInt(e.target.value) || 1)
            }
            className="w-full px-4 py-3 bg-white border-2 border-blue-200 text-blue-900 rounded-xl focus:outline-none focus:border-red-500 text-lg"
          />
        </div>

        {/* ===============================
            🔳 GRID DE QR CODES
            ===============================
            - Gera um QR Code para cada mesa
            - URL contém o parâmetro ?mesa=N
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: numeroMesas }, (_, i) => i + 1).map(mesa => {

            // -------------------------------
            // 🔗 URL FINAL DO CLIENTE
            // Exemplo:
            // https://seudominio.com/?mesa=3
            // -------------------------------
            const urlMesa =
              `${window.location.origin}${window.location.pathname}?mesa=${mesa}`;

            // -------------------------------
            // 🔲 URL DO QR CODE
            // Gerado via API externa
            // -------------------------------
            const qrCodeUrl =
              `https://api.qrserver.com/v1/create-qr-code/?size=${CONFIG.qrCodes.tamanho}x${CONFIG.qrCodes.tamanho}&data=${encodeURIComponent(urlMesa)}`;

            return (
              <div 
                key={mesa}
                className="bg-gray-50 rounded-xl p-4 text-center border-2 border-blue-200 hover:border-orange-500 transition"
              >
                {/* QR Code */}
                <div className="bg-white p-2 rounded-lg mb-2">
                  <img 
                    src={qrCodeUrl} 
                    alt={`QR Code Mesa ${mesa}`}
                    className="w-full h-auto"
                  />
                </div>

                {/* Identificação da mesa */}
                <p className="font-bold text-lg text-blue-900">
                  Mesa {mesa}
                </p>

                {/* Download individual */}
                <a
                  href={qrCodeUrl}
                  download={`mesa-${mesa}.png`}
                  className="text-xs text-cyan-600 hover:text-cyan-500 underline mt-1 inline-block"
                >
                  Baixar PNG
                </a>
              </div>
            );
          })}
        </div>

        {/* ===============================
            💡 DICA DE USO
            =============================== */}
        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-900">
            <strong>💡 Dica:</strong> Imprima em papel adesivo ou plastifique para maior durabilidade!
          </p>
        </div>

        {/* ===============================
            🖨️ BOTÃO DE IMPRESSÃO
            ===============================
            Imprime todos os QR Codes exibidos
        */}
        <button
          onClick={() => window.print()}
          className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-semibold"
        >
          🖨️ Imprimir Todos os QR Codes
        </button>
      </div>
    </div>
  );
};
