import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Send, Edit, Lock, LogOut, X, Save } from 'lucide-react';
//Configurações e utilitários
import { CONFIG, validarConfiguracao } from './config/configuracoes';
import { enviarParaWhatsApp } from './utils/whatsapp';
//Componentes 
import { Header } from './components/Header';
import { CardProduto } from './components/CardProduto';
import { BotaoFinalizar } from './components/BotaoFinalizar';
import { ModalLogin } from './components/ModalLogin';
import { ModalProduto } from './components/ModalProduto';
import { ModalQRCodes } from './components/ModalQRCodes';
import { Carrinho } from './components/Carrinho';
//Hooks personalizados
import { useCarrinho } from './hooks/useCarrinho';
import { useProdutos } from './hooks/useProdutos';


export default function CardapioDigital() {
  // ========================================
  // 🎣 HOOKS PERSONALIZADOS
  // ========================================
  
  // Hook do carrinho (toda a lógica!)
  const {
    carrinho,
    adicionarAoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerDoCarrinho,
    calcularTotal,
    obterQuantidadeNoCarrinho,
    totalItens,
  } = useCarrinho();

  // Hook de produtos (toda a lógica!)
  const {
    produtos,
    adicionarProduto,
    editarProduto,
    deletarProduto,
  } = useProdutos();

  // ========================================
  // 📱 ESTADOS DA UI
  // ========================================
  
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarQRCodes, setMostrarQRCodes] = useState(false);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');
  
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modoEdicao, setModoEdicao] = useState('adicionar');
  const [observacoes, setObservacoes] = useState('');
  
  const [mesaAtual, setMesaAtual] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mesa') || null;
  });

  // ========================================
  // ⚙️ EFEITOS
  // ========================================
  
  // Validar configurações ao carregar
  useEffect(() => {
    validarConfiguracao();
  }, []);

  // ========================================
  // 🔐 FUNÇÕES DE AUTENTICAÇÃO
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
  // 📦 FUNÇÕES DE PRODUTOS
  // ========================================
  
  const abrirModalAdicionar = (categoria) => {
    setModoEdicao('adicionar');
    setProdutoEditando({
      id: Date.now(),
      nome: '',
      descricao: '',
      preco: 0,
      categoria: categoria,
      imagem: ''
    });
    setMostrarModal(true);
  };

  const abrirModalEditar = (produto) => {
    setModoEdicao('editar');
    setProdutoEditando({ ...produto });
    setMostrarModal(true);
  };

  const salvarProduto = () => {
    if (!produtoEditando.nome || !produtoEditando.descricao || produtoEditando.preco <= 0) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const categoria = produtoEditando.categoria;

    if (modoEdicao === 'adicionar') {
      adicionarProduto(produtoEditando, categoria);
      alert('Produto adicionado com sucesso! ✅');
    } else {
      editarProduto(produtoEditando);
      alert('Produto atualizado com sucesso! ✅');
    }

    setMostrarModal(false);
    setProdutoEditando(null);
  };

  const handleDeletarProduto = (produto) => {
    const sucesso = deletarProduto(produto);
    if (sucesso) {
      alert('Produto deletado! 🗑️');
    }
  };

  // ========================================
  // 📱 FUNÇÕES DO WHATSAPP
  // ========================================
  
  const handleEnviarWhatsApp = () => {
    enviarParaWhatsApp(carrinho, calcularTotal(), mesaAtual, observacoes);
    setObservacoes('');
  };

  // ========================================
  // 🎨 RENDERIZAÇÃO
  // ========================================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header 
        mesaAtual={mesaAtual}
        isAdmin={isAdmin}
        contadorCarrinho={totalItens}
        onAbrirCarrinho={() => setMostrarCarrinho(!mostrarCarrinho)}
        onAbrirLogin={() => setMostrarLogin(true)}
        onLogout={fazerLogout}
        onAbrirQRCodes={() => setMostrarQRCodes(true)}
      />

      <div className="container mx-auto px-4 py-10">
        {/* Seção Hambúrgueres */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">🍔 Hambúrgueres</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full"></div>
            </div>
            {isAdmin && (
              <button
                onClick={() => abrirModalAdicionar('hamburgueres')}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition flex items-center gap-2 shadow-xl font-semibold"
              >
                <Plus size={22} />
                Adicionar
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

        {/* Seção Bebidas */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">🥤 Bebidas</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
            </div>
            {isAdmin && (
              <button
                onClick={() => abrirModalAdicionar('bebidas')}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition flex items-center gap-2 shadow-xl font-semibold"
              >
                <Plus size={22} />
                Adicionar
              </button>
            )}
          </div>
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

      {/* Botão Finalizar Pedido */}
      <BotaoFinalizar 
        totalItens={totalItens}
        onClick={() => setMostrarCarrinho(true)}
        mostrarCarrinho={mostrarCarrinho}
      />

      {/* Modais */}
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