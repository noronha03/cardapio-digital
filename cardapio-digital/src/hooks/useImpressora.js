// ========================================
// 🖨️ HOOK: useImpressora
// ========================================
// Gerencia configuração e impressão automática

import { useState, useEffect } from 'react';

export const useImpressora = () => {
  const [impressoraHabilitada, setImpressoraHabilitada] = useState(() => {
    const salvo = localStorage.getItem('impressoraHabilitada');
    return salvo === 'true';
  });

  const [impressoraNome, setImpressoraNome] = useState(() => {
    return localStorage.getItem('impressoraNome') || '';
  });

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('impressoraHabilitada', impressoraHabilitada);
    localStorage.setItem('impressoraNome', impressoraNome);
  }, [impressoraHabilitada, impressoraNome]);

  // Habilitar impressora
  const habilitarImpressora = (nome) => {
    setImpressoraNome(nome);
    setImpressoraHabilitada(true);
  };

  // Desabilitar impressora
  const desabilitarImpressora = () => {
    setImpressoraHabilitada(false);
  };

  // Função de impressão silenciosa
  const imprimirComanda = async (elementoId = 'comanda-impressao') => {
    if (!impressoraHabilitada) {
      console.log('Impressora não habilitada');
      return;
    }

    try {
      const elemento = document.getElementById(elementoId);
      if (!elemento) {
        console.error('Elemento de impressão não encontrado');
        return;
      }

      // Criar iframe invisível
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      // Copiar conteúdo para iframe
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            @page {
              size: 80mm auto;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 10mm;
              font-family: 'Courier New', monospace;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          ${elemento.innerHTML}
        </body>
        </html>
      `);
      doc.close();

      // Aguardar carregamento e imprimir
      iframe.contentWindow.onload = () => {
        setTimeout(() => {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          
          // Remover iframe após impressão
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        }, 250);
      };

      return true;
    } catch (error) {
      console.error('Erro ao imprimir:', error);
      alert('Erro ao imprimir comanda. Verifique se a impressora está conectada.');
      return false;
    }
  };

  return {
    impressoraHabilitada,
    impressoraNome,
    habilitarImpressora,
    desabilitarImpressora,
    imprimirComanda,
  };
};