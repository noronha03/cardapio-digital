// ========================================
// 🛒 HOOK: useCarrinho
// ========================================
// Gerencia toda a lógica do carrinho de compras

import { useState, useEffect } from 'react';

export const useCarrinho = () => {
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  // Adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    const itemExiste = carrinho.find(item => item.id === produto.id);
    
    if (itemExiste) {
      setCarrinho(carrinho.map(item =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  // Aumentar quantidade
  const aumentarQuantidade = (id) => {
    setCarrinho(carrinho.map(item =>
      item.id === id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    ));
  };

  // Diminuir quantidade
  const diminuirQuantidade = (id) => {
    const item = carrinho.find(item => item.id === id);
    
    if (item.quantidade === 1) {
      removerDoCarrinho(id);
    } else {
      setCarrinho(carrinho.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      ));
    }
  };

  // Remover do carrinho
  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  // Calcular total
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => 
      total + (item.preco * item.quantidade), 0
    );
  };

  // Obter quantidade de um produto no carrinho
  const obterQuantidadeNoCarrinho = (id) => {
    const item = carrinho.find(item => item.id === id);
    return item ? item.quantidade : 0;
  };

  // Limpar carrinho
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // Total de itens no carrinho
  const totalItens = carrinho.reduce((total, item) => 
    total + Number(item.quantidade), 0
  );

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