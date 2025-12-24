// ========================================
// 📦 HOOK: useProdutos
// ========================================
// Hook responsável por TODA a gestão de produtos (CRUD).
//
// Responsabilidades:
// - Inicializar produtos a partir da configuração
// - Persistir produtos no localStorage
// - Adicionar, editar e remover produtos
// - Controlar categorias
// - Fornecer métodos utilitários (get por ID, reset)
//
// Este hook NÃO renderiza UI.
// Ele concentra apenas regras de negócio.
// ========================================

import { useState, useEffect } from 'react';
import { CONFIG } from '../config/configuracoes';

export const useProdutos = () => {

  // ========================================
  // 📋 PRODUTOS PADRÃO
  // ========================================
  // Produtos iniciais definidos no arquivo de configuração
  // Usados apenas quando não há dados salvos no navegador
  const produtosIniciais = CONFIG.produtosIniciais;

  // ========================================
  // 🧠 ESTADO PRINCIPAL
  // ========================================
  // Inicializa os produtos:
  // - Primeiro tenta carregar do localStorage
  // - Caso não exista, usa os produtos padrão
  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem('produtos');
    return produtosSalvos
      ? JSON.parse(produtosSalvos)
      : produtosIniciais;
  });

  // ========================================
  // 💾 PERSISTÊNCIA
  // ========================================
  // Sempre que a lista de produtos mudar,
  // salvamos automaticamente no localStorage
  useEffect(() => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }, [produtos]);

  // ========================================
  // ➕ ADICIONAR PRODUTO
  // ========================================
  // Regras:
  // - Gera um ID único automaticamente
  // - Mantém a categoria correta
  // - Não permite colisão de IDs
  const adicionarProduto = (novoProduto, categoria) => {

    // Geração segura de ID (baseado no maior ID existente)
    const novoId =
      Math.max(
        ...Object.values(produtos)
          .flat()
          .map(p => p.id),
        0
      ) + 1;

    const produtoComId = {
      ...novoProduto,
      id: novoId,
      categoria,
    };

    // Atualiza apenas a categoria correspondente
    setProdutos({
      ...produtos,
      [categoria]: [...produtos[categoria], produtoComId],
    });

    // Retorna o produto criado (útil para logs ou ações futuras)
    return produtoComId;
  };

  // ========================================
  // ✏️ EDITAR PRODUTO
  // ========================================
  // Atualiza um produto existente mantendo a categoria
  const editarProduto = (produtoEditado) => {
    const categoria = produtoEditado.categoria;

    setProdutos({
      ...produtos,
      [categoria]: produtos[categoria].map(p =>
        p.id === produtoEditado.id ? produtoEditado : p
      ),
    });
  };

  // ========================================
  // 🗑️ DELETAR PRODUTO
  // ========================================
  // Regra:
  // - Exige confirmação do usuário
  // - Remove apenas da categoria correta
  // - Retorna boolean para controle externo
  const deletarProduto = (produto) => {
    if (window.confirm(`Tem certeza que deseja deletar "${produto.nome}"?`)) {
      const categoria = produto.categoria;

      setProdutos({
        ...produtos,
        [categoria]: produtos[categoria].filter(
          p => p.id !== produto.id
        ),
      });

      return true;
    }
    return false;
  };

  // ========================================
  // 🔎 OBTER PRODUTO POR ID
  // ========================================
  // Percorre todas as categorias
  // Útil para buscas globais ou integrações futuras
  const obterProdutoPorId = (id) => {
    return Object.values(produtos)
      .flat()
      .find(p => p.id === id);
  };

  // ========================================
  // ♻️ RESETAR PRODUTOS
  // ========================================
  // Restaura os produtos padrão definidos no CONFIG
  // Remove também os dados persistidos
  const resetarProdutos = () => {
    if (window.confirm('Isso vai restaurar os produtos padrão. Confirma?')) {
      setProdutos(produtosIniciais);
      localStorage.removeItem('produtos');
      return true;
    }
    return false;
  };

  // ========================================
  // 📤 API PÚBLICA DO HOOK
  // ========================================
  // Tudo que os componentes podem consumir
  return {
    produtos,
    adicionarProduto,
    editarProduto,
    deletarProduto,
    obterProdutoPorId,
    resetarProdutos,
  };
};
