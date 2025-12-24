// ========================================
// 🛒 HOOK: useCarrinho
// ========================================
// Hook responsável por TODA a lógica do carrinho.
//
// Responsabilidades:
// - Persistir carrinho no localStorage
// - Adicionar, remover e atualizar itens
// - Controlar quantidades
// - Calcular total do pedido
// - Expor dados consolidados para a UI
//
// Este hook NÃO renderiza nada.
// Ele apenas fornece regras de negócio.
// ========================================

import { useState, useEffect } from 'react';

export const useCarrinho = () => {

  // ========================================
  // 🧠 ESTADO PRINCIPAL
  // ========================================
  // Inicializa o carrinho a partir do localStorage
  // garantindo persistência entre recarregamentos
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  // ========================================
  // 💾 PERSISTÊNCIA
  // ========================================
  // Sempre que o carrinho mudar,
  // salvamos automaticamente no localStorage
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  // ========================================
  // ➕ ADICIONAR PRODUTO
  // ========================================
  // Regra:
  // - Se o produto já existir, incrementa quantidade
  // - Se não existir, adiciona com quantidade = 1
  const adicionarAoCarrinho = (produto) => {
    const itemExiste = carrinho.find(item => item.id === produto.id);
    
    if (itemExiste) {
      setCarrinho(
        carrinho.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([
        ...carrinho,
        { ...produto, quantidade: 1 }
      ]);
    }
  };

  // ========================================
  // 🔼 AUMENTAR QUANTIDADE
  // ========================================
  // Incrementa a quantidade de um item específico
  const aumentarQuantidade = (id) => {
    setCarrinho(
      carrinho.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  // ========================================
  // 🔽 DIMINUIR QUANTIDADE
  // ========================================
  // Regra:
  // - Se a quantidade chegar a 1, remove o item
  // - Caso contrário, apenas decrementa
  const diminuirQuantidade = (id) => {
    const item = carrinho.find(item => item.id === id);
    
    if (item.quantidade === 1) {
      removerDoCarrinho(id);
    } else {
      setCarrinho(
        carrinho.map(item =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
      );
    }
  };

  // ========================================
  // 🗑️ REMOVER ITEM
  // ========================================
  // Remove completamente o produto do carrinho
  const removerDoCarrinho = (id) => {
    setCarrinho(
      carrinho.filter(item => item.id !== id)
    );
  };

  // ========================================
  // 💰 CALCULAR TOTAL DO PEDIDO
  // ========================================
  // Soma: preço × quantidade de cada item
  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + (item.preco * item.quantidade),
      0
    );
  };

  // ========================================
  // 🔎 QUANTIDADE DE UM PRODUTO ESPECÍFICO
  // ========================================
  // Usado principalmente nos cards de produto
  const obterQuantidadeNoCarrinho = (id) => {
    const item = carrinho.find(item => item.id === id);
    return item ? item.quantidade : 0;
  };

  // ========================================
  // 🧹 LIMPAR CARRINHO
  // ========================================
  // Útil após envio do pedido ou reset manual
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // ========================================
  // 🔢 TOTAL DE ITENS
  // ========================================
  // Soma todas as quantidades (não confundir com total em R$)
  const totalItens = carrinho.reduce(
    (total, item) => total + Number(item.quantidade),
    0
  );

  // ========================================
  // 📤 API PÚBLICA DO HOOK
  // ========================================
  // Tudo que o componente consumidor pode usar
  return {
    carrinho,
    adicionarAoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerDoCarrinho,
    calcularTotal,
    obterQuantidadeNoCarrinho,
    limparCarrinho,
    totalItens,
  };
};