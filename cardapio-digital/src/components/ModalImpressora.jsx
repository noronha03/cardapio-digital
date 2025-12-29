// ========================================
// 🖨️ COMPONENTE: MODAL CONFIGURAÇÃO IMPRESSORA
// ========================================

import React, { useState, useEffect } from 'react';
import { X, Printer, Check } from 'lucide-react';

export const ModalImpressora = ({
  mostrar,
  impressoraHabilitada,
  impressoraNome,
  onHabilitar,
  onDesabilitar,
  onFechar,
}) => {
  const [impressoras, setImpressoras] = useState([]);
  const [impressoraSelecionada, setImpressoraSelecionada] = useState('');
  const [testando, setTestando] = useState(false);

  useEffect(() => {
    if (mostrar) {
      buscarImpressoras();
    }
  }, [mostrar]);

  const buscarImpressoras = async () => {
    // Lista de impressoras comuns (simulação)
    // Em produção, pode usar API específica ou deixar usuário digitar
    setImpressoras([
      'Impressora Padrão do Sistema',
      'Elgin i9',
      'Bematech MP-4200',
      'Daruma DR-800',
      'Epmark',
      'Outra impressora...'
    ]);
  };

  const testarImpressao = () => {
    setTestando(true);
    
    // Criar página de teste
    const janelaImpressao = window.open('', '', 'width=300,height=400');
    janelaImpressao.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @page { size: 80mm auto; margin: 0; }
          body { 
            margin: 0; 
            padding: 10mm; 
            font-family: 'Courier New', monospace; 
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div style="text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 10px;">
          <h1 style="font-size: 20px; margin: 0;">TESTE DE IMPRESSÃO</h1>
        </div>
        <p><strong>Impressora:</strong> ${impressoraSelecionada || 'Padrão'}</p>
        <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        <div style="border-top: 2px dashed #000; margin: 10px 0;"></div>
        <p style="text-align: center;">Se esta mensagem foi impressa corretamente, sua impressora está funcionando! ✅</p>
        <div style="border-top: 2px dashed #000; margin: 10px 0;"></div>
        <p style="text-align: center; font-size: 10px;">Sistema de Cardápio Digital</p>
      </body>
      </html>
    `);
    
    setTimeout(() => {
      janelaImpressao.print();
      janelaImpressao.close();
      setTestando(false);
    }, 500);
  };

  const salvarConfiguracao = () => {
    if (!impressoraSelecionada) {
      alert('Selecione uma impressora!');
      return;
    }

    onHabilitar(impressoraSelecionada);
    alert('✅ Impressora configurada com sucesso!\n\nAgora os pedidos serão impressos automaticamente.');
    onFechar();
  };

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Printer size={32} className="text-blue-600" />
            🖨️ Configurar Impressora
          </h2>
          <button 
            onClick={onFechar} 
            className="text-gray-500 hover:text-gray-900 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* Status Atual */}
        <div className={`mb-6 p-4 rounded-xl ${impressoraHabilitada ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
          <div className="flex items-center gap-3">
            {impressoraHabilitada ? (
              <>
                <Check size={24} className="text-green-600" />
                <div className="flex-1">
                  <p className="font-bold text-green-900">✅ Impressão Automática ATIVA</p>
                  <p className="text-sm text-green-700">Impressora: {impressoraNome}</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Desativar impressão automática?')) {
                      onDesabilitar();
                      alert('Impressão automática desativada.');
                    }
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                >
                  Desativar
                </button>
              </>
            ) : (
              <>
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <p className="font-bold text-yellow-900">Impressão automática DESATIVADA</p>
                  <p className="text-sm text-yellow-700">Configure a impressora para habilitar</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-blue-900 mb-2">📋 Antes de configurar:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Conecte a impressora térmica via USB ou Bluetooth</li>
            <li>Certifique-se que está ligada e com papel</li>
            <li>Instale os drivers (se necessário)</li>
            <li>Selecione a impressora abaixo</li>
            <li>Faça um teste de impressão</li>
          </ol>
        </div>

        {/* Seleção de Impressora */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Selecione a Impressora
          </label>
          <select
            value={impressoraSelecionada}
            onChange={(e) => setImpressoraSelecionada(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
          >
            <option value="">-- Selecione --</option>
            {impressoras.map((imp, index) => (
              <option key={index} value={imp}>{imp}</option>
            ))}
          </select>
          
          {impressoraSelecionada === 'Outra impressora...' && (
            <input
              type="text"
              placeholder="Digite o nome da impressora"
              onChange={(e) => setImpressoraSelecionada(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-blue-500 mt-3"
            />
          )}
        </div>

        {/* Botões */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={testarImpressao}
            disabled={!impressoraSelecionada || testando}
            className="bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Printer size={20} />
            {testando ? 'Testando...' : '🧪 Testar Impressão'}
          </button>

          <button
            onClick={salvarConfiguracao}
            disabled={!impressoraSelecionada}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Salvar e Ativar
          </button>
        </div>

        {/* Aviso */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-600">
            <strong>💡 Dica:</strong> Para impressão automática funcionar perfeitamente, configure a impressora como padrão no sistema operacional e mantenha este navegador sempre aberto em um dispositivo fixo (computador ou tablet).
          </p>
        </div>
      </div>
    </div>
  );
};