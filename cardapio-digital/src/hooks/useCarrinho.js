import { useState, useEffect } from 'react';

export const useCarrinho = () => {

  // ===============================
  // 🧠 ESTADO PRINCIPAL
  // ===============================
  // O carrinho agora vive por SESSÃO
  // Nova leitura de QRCode = novo carrinho
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = sessionStorage.getItem('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  // ===============================
  // 💾 PERSISTÊNCIA POR SESSÃO
  // ===============================
  useEffect(() => {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  // ===============================
  // ➕ ADICIONAR PRODUTO
  // ===============================
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
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const aumentarQuantidade = (id) => {
    setCarrinho(
      carrinho.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

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

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + (item.preco * item.quantidade),
      0
    );
  };

  const obterQuantidadeNoCarrinho = (id) => {
    const item = carrinho.find(item => item.id === id);
    return item ? item.quantidade : 0;
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    sessionStorage.removeItem('carrinho');
  };

  const totalItens = carrinho.reduce(
    (total, item) => total + Number(item.quantidade),
    0
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
