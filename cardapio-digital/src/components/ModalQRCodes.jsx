// ========================================
// 🔲 COMPONENTE: MODAL QR CODES
// ========================================
// Gerador de QR Codes para mesas

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CONFIG } from '../config/configuracoes';

export const ModalQRCodes = ({
  mostrar,
  onFechar,
}) => {
  const [numeroMesas, setNumeroMesas] = useState(CONFIG.qrCodes.mesasPadrao);

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-blue-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-900">🔲 Gerador de QR Codes</h2>
          <button 
            onClick={onFechar} 
            className="text-blue-700 hover:text-blue-900 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* Instruções */}
        <div className="bg-blue-100 bg-opacity-60 border-2 border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-blue-900 mb-2">📋 Como usar:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Defina quantas mesas você tem</li>
            <li>Baixe os QR Codes</li>
            <li>Imprima e cole nas mesas</li>
            <li>Clientes escaneiam e o pedido vem identificado!</li>
          </ol>
        </div>

        {/* Input Número de Mesas */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Quantas mesas?
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={numeroMesas}
            onChange={(e) => setNumeroMesas(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 bg-white border-2 border-blue-200 text-blue-900 rounded-xl focus:outline-none focus:border-red-500 text-lg"
          />
        </div>

        {/* Grid de QR Codes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: numeroMesas }, (_, i) => i + 1).map(mesa => {
            const urlMesa = `${window.location.origin}${window.location.pathname}?mesa=${mesa}`;
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${CONFIG.qrCodes.tamanho}x${CONFIG.qrCodes.tamanho}&data=${encodeURIComponent(urlMesa)}`;
            
            return (
              <div 
                key={mesa} 
                className="bg-gray-50 rounded-xl p-4 text-center border-2 border-blue-200 hover:border-orange-500 transition"
              >
                <div className="bg-white p-2 rounded-lg mb-2">
                  <img 
                    src={qrCodeUrl} 
                    alt={`QR Code Mesa ${mesa}`}
                    className="w-full h-auto"
                  />
                </div>
                <p className="font-bold text-lg text-blue-900">Mesa {mesa}</p>
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

        {/* Dica */}
        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-900">
            <strong>💡 Dica:</strong> Imprima em papel adesivo ou plastifique para maior durabilidade!
          </p>
        </div>

        {/* Botão Imprimir */}
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