// ========================================
// 📱 UTILITÁRIO DE WHATSAPP
// ========================================

import { CONFIG } from '../config/configuracoes';

/**
 * Formata e envia mensagem para WhatsApp
 */
export const enviarParaWhatsApp = (carrinho, total, mesa, observacoes) => {
  if (carrinho.length === 0) {
    alert('Adicione itens ao carrinho primeiro!');
    return;
  }

  let mensagem = '*🍔 NOVO PEDIDO*\n';
  
  if (mesa) {
    mensagem += `*📍 MESA ${mesa}*\n`;
  }
  
  mensagem += '\n';
  
  carrinho.forEach(item => {
    mensagem += `*${item.quantidade}x ${item.nome}*\n`;
    mensagem += `R$ ${item.preco.toFixed(2)} cada\n`;
    mensagem += `Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
  });
  
  mensagem += `*TOTAL: R$ ${total.toFixed(2)}*`;

  if (observacoes && observacoes.trim()) {
    mensagem += `\n\n*📝 OBSERVAÇÕES:*\n${observacoes}`;
  }

  const numeroWhatsApp = CONFIG.whatsapp.numero;
  
  if (!numeroWhatsApp || numeroWhatsApp.length < 12) {
    alert('⚠️ Erro: Número do WhatsApp não configurado!');
    console.error('Configure em src/config/configuracoes.js');
    return;
  }

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
};