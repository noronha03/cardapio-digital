// ========================================
// 🧠 COMPONENTE PRINCIPAL: CARDÁPIO DIGITAL
// ========================================
// Este é o COMPONENTE RAIZ do sistema.
//
// Responsabilidades:
// - Orquestrar todos os componentes
// - Controlar estados globais da aplicação
// - Gerenciar autenticação admin
// - Controlar carrinho, produtos e pedidos
// - Integrar com WhatsApp
//
// Arquitetura:
// - Lógica pesada fica em HOOKS personalizados
// - Este arquivo apenas coordena e renderiza
// ========================================

import React, { useState, useEffect } from 'react';

// Ícones globais
import { ShoppingCart, Plus } from 'lucide-react';

// ===============================
// ⚙️ CONFIGURAÇÕES E UTILITÁRIOS
// ===============================
import { CONFIG, validarConfiguracao } from './config/configuracoes';
import { enviarParaWhatsApp } from './utils/whatsapp';

// ===============================
// 🧩 COMPONENTES
// ===============================
import { Header } from './components/Header';
import { CardProduto } from './components/CardProduto';
import { BotaoFinalizar } from './components/BotaoFinalizar';
import { ModalLogin } from './components/ModalLogin';
import { ModalProduto } from './components/ModalProduto';
import { ModalQRCodes } from './components/ModalQRCodes';
import { Carrinho } from './components/Carrinho';

// ===============================
// 🎣 HOOKS PERSONALIZADOS
// ===============================
import { useCarrinho } from './hooks/useCarrinho';
import { useProdutos } from './hooks/useProdutos';

export default function CardapioDigital() {

  // ========================================
  // 🎣 HOOKS DE NEGÓCIO
  // ========================================
  // Toda a lógica pesada do sistema fica fora
  // deste componente, seguindo boas práticas

  // ---- Carrinho ----
  const {
    carrinho,                     // Lista de itens no carrinho
    adicionarAoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerDoCarrinho,
    calcularTotal,                // Soma total do pedido
    obterQuantidadeNoCarrinho,    // Quantidade de um item específico
    totalItens,                   // Total de itens no carrinho
  } = useCarrinho();

  // ---- Produtos ----
  const {
    produtos,                     // Produtos organizados por categoria
    adicionarProduto,
    editarProduto,
    deletarProduto,
  } = useProdutos();

  // ========================================
  // 📱 ESTADOS DE INTERFACE (UI)
  // ========================================

  // Modais e telas
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarQRCodes, setMostrarQRCodes] = useState(false);

  // Autenticação
  const [isAdmin, setIsAdmin] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');

  // Produto em edição/criação
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modoEdicao, setModoEdicao] = useState('adicionar');

  // Observações do pedido
  const [observacoes, setObservacoes] = useState('');

  // ===============================
  // 📍 IDENTIFICAÇÃO DA MESA
  // ===============================
  // Lida com URL do tipo:
  // https://site.com/?mesa=3
  const [mesaAtual, setMesaAtual] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mesa') || null;
  });

  // ========================================
  // ⚙️ EFEITOS DE INICIALIZAÇÃO
  // ========================================

  // Valida as configurações ao iniciar o app
  useEffect(() => {
    validarConfiguracao();
  }, []);

  // ========================================
  // 🔐 AUTENTICAÇÃO ADMIN
  // ========================================

  const fazerLogin = () => {
    if (senhaDigitada === CONFIG.admin.senha) {
      setIsAdmin(true);
      setMostrarLogin(false);
      setSenhaDigitada('');
      alert('Login realizado com sucesso! 🎉');
    } else {
      alert('Senha incorreta! ❌');
      setSenhaDigitada('');
    }
  };

  const fazerLogout = () => {
    setIsAdmin(false);
    alert('Logout realizado!');
  };

  // ========================================
  // 📦 GERENCIAMENTO DE PRODUTOS
  // ========================================

  // Abrir modal para adicionar novo produto
  const abrirModalAdicionar = (categoria) => {
    setModoEdicao('adicionar');
    setProdutoEditando({
      id: Date.now(),          // ID temporário
      nome: '',
      descricao: '',
      preco: 0,
      categoria,
      imagem: '',
    });
    setMostrarModal(true);
  };

  // Abrir modal para editar produto existente
  const abrirModalEditar = (produto) => {
    setModoEdicao('editar');
    setProdutoEditando({ ...produto });
    setMostrarModal(true);
  };

  // Salvar produto (novo ou editado)
  const salvarProduto = () => {
    if (
      !produtoEditando.nome ||
      !produtoEditando.descricao ||
      produtoEditando.preco <= 0
    ) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    if (modoEdicao === 'adicionar') {
      adicionarProduto(produtoEditando, produtoEditando.categoria);
      alert('Produto adicionado com sucesso! ✅');
    } else {
      editarProduto(produtoEditando);
      alert('Produto atualizado com sucesso! ✅');
    }

    setMostrarModal(false);
    setProdutoEditando(null);
  };

  // Deletar produto
  const handleDeletarProduto = (produto) => {
    const sucesso = deletarProduto(produto);
    if (sucesso) {
      alert('Produto deletado! 🗑️');
    }
  };

  // ========================================
  // 📱 ENVIO DO PEDIDO (WHATSAPP)
  // ========================================

  const handleEnviarWhatsApp = () => {
    enviarParaWhatsApp(
      carrinho,
      calcularTotal(),
      mesaAtual,
      observacoes
    );
    setObservacoes('');
  };

  // ========================================
  // 🎨 RENDERIZAÇÃO DO SISTEMA
  // ========================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">

      {/* HEADER */}
      <Header
        mesaAtual={mesaAtual}
        isAdmin={isAdmin}
        contadorCarrinho={totalItens}
        onAbrirCarrinho={() => setMostrarCarrinho(!mostrarCarrinho)}
        onAbrirLogin={() => setMostrarLogin(true)}
        onLogout={fazerLogout}
        onAbrirQRCodes={() => setMostrarQRCodes(true)}
      />

      {/* ===============================
          🍔 SEÇÃO: HAMBÚRGUERES
          =============================== */}
      <div className="container mx-auto px-4 py-10">
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold">🍔 Hambúrgueres</h2>

            {isAdmin && (
              <button
                onClick={() => abrirModalAdicionar('hamburgueres')}
                className="bg-green-600 text-white px-6 py-3 rounded-xl"
              >
                <Plus size={22} /> Adicionar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtos.hamburgueres.map(produto => (
              <CardProduto
                key={produto.id}
                produto={produto}
                categoria="hamburgueres"
                isAdmin={isAdmin}
                quantidadeNoCarrinho={obterQuantidadeNoCarrinho(produto.id)}
                onAdicionar={adicionarAoCarrinho}
                onAumentar={aumentarQuantidade}
                onDiminuir={diminuirQuantidade}
                onEditar={abrirModalEditar}
                onDeletar={handleDeletarProduto}
              />
            ))}
          </div>
        </section>

        {/* ===============================
            🥤 SEÇÃO: BEBIDAS
            =============================== */}
        <section>
          <h2 className="text-4xl font-bold mb-8">🥤 Bebidas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtos.bebidas.map(produto => (
              <CardProduto
                key={produto.id}
                produto={produto}
                categoria="bebidas"
                isAdmin={isAdmin}
                quantidadeNoCarrinho={obterQuantidadeNoCarrinho(produto.id)}
                onAdicionar={adicionarAoCarrinho}
                onAumentar={aumentarQuantidade}
                onDiminuir={diminuirQuantidade}
                onEditar={abrirModalEditar}
                onDeletar={handleDeletarProduto}
              />
            ))}
          </div>
        </section>
      </div>

      {/* BOTÃO FLUTUANTE */}
      <BotaoFinalizar
        totalItens={totalItens}
        onClick={() => setMostrarCarrinho(true)}
        mostrarCarrinho={mostrarCarrinho}
      />

      {/* ===============================
          🧩 MODAIS
          =============================== */}
      <ModalLogin
        mostrar={mostrarLogin}
        senhaDigitada={senhaDigitada}
        onChangeSenha={setSenhaDigitada}
        onLogin={fazerLogin}
        onFechar={() => setMostrarLogin(false)}
      />

      <ModalProduto
        mostrar={mostrarModal}
        modoEdicao={modoEdicao}
        produto={produtoEditando}
        onChangeProduto={setProdutoEditando}
        onSalvar={salvarProduto}
        onFechar={() => setMostrarModal(false)}
      />

      <ModalQRCodes
        mostrar={mostrarQRCodes}
        onFechar={() => setMostrarQRCodes(false)}
      />

      <Carrinho
        mostrar={mostrarCarrinho}
        carrinho={carrinho}
        observacoes={observacoes}
        onChangeObservacoes={setObservacoes}
        onAumentar={aumentarQuantidade}
        onDiminuir={diminuirQuantidade}
        onRemover={removerDoCarrinho}
        onEnviarWhatsApp={handleEnviarWhatsApp}
        onFechar={() => setMostrarCarrinho(false)}
        calcularTotal={calcularTotal}
      />
    </div>
  );
}