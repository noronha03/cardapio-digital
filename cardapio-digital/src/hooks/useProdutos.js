// ========================================
// 📦 HOOK: useProdutos
// ========================================
// Gerencia toda a lógica de produtos (CRUD)

import { useState, useEffect } from 'react';
import { CONFIG } from '../config/configuracoes';

export const useProdutos = () => {
  const produtosIniciais = CONFIG.produtosIniciais;

  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem('produtos');
    return produtosSalvos ? JSON.parse(produtosSalvos) : produtosIniciais;
  });

  // Salvar produtos no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }, [produtos]);

  // Adicionar novo produto
  const adicionarProduto = (novoProduto, categoria) => {
    const novoId = Math.max(
      ...Object.values(produtos).flat().map(p => p.id), 
      0
    ) + 1;

    const produtoComId = {
      ...novoProduto,
      id: novoId,
      categoria,
    };

    setProdutos({
      ...produtos,
      [categoria]: [...produtos[categoria], produtoComId],
    });

    return produtoComId;
  };

  // Editar produto existente
  const editarProduto = (produtoEditado) => {
    const categoria = produtoEditado.categoria;
    
    setProdutos({
      ...produtos,
      [categoria]: produtos[categoria].map(p =>
        p.id === produtoEditado.id ? produtoEditado : p
      ),
    });
  };

  // Deletar produto
  const deletarProduto = (produto) => {
    if (window.confirm(`Tem certeza que deseja deletar "${produto.nome}"?`)) {
      const categoria = produto.categoria;
      
      setProdutos({
        ...produtos,
        [categoria]: produtos[categoria].filter(p => p.id !== produto.id),
      });

      return true;
    }
    return false;
  };

  // Obter produto por ID
  const obterProdutoPorId = (id) => {
    return Object.values(produtos)
      .flat()
      .find(p => p.id === id);
  };

  // Resetar produtos para o padrão
  const resetarProdutos = () => {
    if (window.confirm('Isso vai restaurar os produtos padrão. Confirma?')) {
      setProdutos(produtosIniciais);
      localStorage.removeItem('produtos');
      return true;
    }
    return false;
  };

  return {
    produtos,
    adicionarProduto,
    editarProduto,
    deletarProduto,
    obterProdutoPorId,
    resetarProdutos,
  };
};