// ========================================
// 🖨️ COMPONENTE: COMANDA PARA IMPRESSÃO
// ========================================

import React from 'react';
import { CONFIG } from '../config/configuracoes';

export const Comanda = ({ 
  carrinho, 
  total, 
  mesa, 
  observacoes,
  mostrar 
}) => {
  if (!mostrar) return null;

  const dataHora = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div id="comanda-impressao" className="hidden print:block">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #comanda-impressao,
          #comanda-impressao * {
            visibility: visible;
          }
          #comanda-impressao {
            position: absolute;
            left: 0;
            top: 0;
            width: 80mm;
            padding: 10mm;
            font-family: 'Courier New', monospace;
          }
          @page {
            size: 80mm auto;
            margin: 0;
          }
        }
      `}</style>

      <div style={{ width: '80mm', fontFamily: 'Courier New, monospace', fontSize: '12px' }}>
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', borderBottom: '2px dashed #000', paddingBottom: '10px', marginBottom: '10px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
            {CONFIG.loja.nome}
          </h1>
          <p style={{ fontSize: '11px', margin: '0' }}>{CONFIG.loja.slogan}</p>
        </div>

        {/* Info do Pedido */}
        <div style={{ marginBottom: '10px' }}>
          <p style={{ margin: '2px 0', fontSize: '14px', fontWeight: 'bold' }}>
            PEDIDO #{Math.floor(Math.random() * 10000)}
          </p>
          <p style={{ margin: '2px 0' }}>Data: {dataHora}</p>
          {mesa && (
            <p style={{ margin: '2px 0', fontSize: '16px', fontWeight: 'bold' }}>
              🔵 MESA: {mesa}
            </p>
          )}
        </div>

        <div style={{ borderTop: '2px dashed #000', marginTop: '10px', paddingTop: '10px' }} />

        {/* Itens */}
        <div style={{ marginBottom: '10px' }}>
          {carrinho.map((item, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{item.quantidade}x {item.nome}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '15px', fontSize: '11px' }}>
                <span>@ R$ {item.preco.toFixed(2)}</span>
                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '2px dashed #000', marginTop: '10px', paddingTop: '10px' }} />

        {/* Observações */}
        {observacoes && (
          <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '3px' }}>
            <p style={{ margin: '0', fontWeight: 'bold', fontSize: '11px' }}>📝 OBSERVAÇÕES:</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px' }}>{observacoes}</p>
          </div>
        )}

        {/* Total */}
        <div style={{ marginTop: '10px', borderTop: '2px solid #000', paddingTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
            <span>TOTAL:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ borderTop: '2px dashed #000', marginTop: '15px', paddingTop: '10px' }} />

        {/* Rodapé */}
        <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '11px' }}>
          <p style={{ margin: '2px 0' }}>Obrigado pela preferência!</p>
          <p style={{ margin: '2px 0' }}>Volte sempre! 😊</p>
        </div>
      </div>
    </div>
  );
};