import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Send, Edit, Lock, LogOut, X, Save } from 'lucide-react';
import { CONFIG, validarConfiguracao } from './config/configuracoes';
import { enviarParaWhatsApp } from './utils/whatsapp';
import { Header } from './components/Header';
import { CardProduto } from './components/CardProduto';
import { BotaoFinalizar } from './components/BotaoFinalizar';
import { ModalLogin } from './components/ModalLogin';
import { ModalProduto } from './components/ModalProduto';
import { ModalQRCodes } from './components/ModalQRCodes';
import { Carrinho } from './components/Carrinho';

export default function CardapioDigital() {
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modoEdicao, setModoEdicao] = useState('adicionar');
  const [mostrarQRCodes, setMostrarQRCodes] = useState(false);
  const [observacoes, setObservacoes] = useState('');
  
  const [mesaAtual, setMesaAtual] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mesa') || null;
  });

  const SENHA_ADMIN = CONFIG.admin.senha;

  const produtosIniciais = CONFIG.produtosIniciais;

  const [produtos, setProdutos] = useState(() => {
    const salvos = localStorage.getItem('cardapio_produtos');
    return salvos ? JSON.parse(salvos) : produtosIniciais;
  });

  useEffect(() => {
    validarConfiguracao();
  }, []);

  const fazerLogin = () => {
    if (senhaDigitada === SENHA_ADMIN) {
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
      setProdutos({
        ...produtos,
        [categoria]: [...produtos[categoria], produtoEditando]
      });
      alert('Produto adicionado com sucesso! ✅');
    } else {
      setProdutos({
        ...produtos,
        [categoria]: produtos[categoria].map(p => 
          p.id === produtoEditando.id ? produtoEditando : p
        )
      });
      alert('Produto atualizado com sucesso! ✅');
    }

    setMostrarModal(false);
    setProdutoEditando(null);
  };

  const deletarProduto = (produto) => {
    if (window.confirm(`Tem certeza que deseja deletar "${produto.nome}"?`)) {
      const categoria = produto.categoria;
      setProdutos({
        ...produtos,
        [categoria]: produtos[categoria].filter(p => p.id !== produto.id)
      });
      alert('Produto deletado! 🗑️');
    }
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(prevCarrinho => {
      const itemIndex = prevCarrinho.findIndex(item => item.id === produto.id);
      if (itemIndex !== -1) {
        return prevCarrinho.map(item =>
          item.id === produto.id ? { ...item, quantidade: Number(item.quantidade) + 1 } : item
        );
      }
      // garantir que não venham propriedades "quantidade" do produto original
      const { quantidade, ...produtoSemQuantidade } = produto;
      return [...prevCarrinho, { ...produtoSemQuantidade, quantidade: 1 }];
    });
  };

  const aumentarQuantidade = (id) => {
    setCarrinho(prevCarrinho =>
      prevCarrinho.map(item =>
        item.id === id ? { ...item, quantidade: Number(item.quantidade) + 1 } : item
      )
    );
  };

  const diminuirQuantidade = (id) => {
    setCarrinho(prevCarrinho => {
      const item = prevCarrinho.find(i => i.id === id);
      if (!item) return prevCarrinho;
      const qty = Number(item.quantidade);
      if (qty === 1) {
        return prevCarrinho.filter(i => i.id !== id);
      }
      return prevCarrinho.map(i =>
        i.id === id ? { ...i, quantidade: qty - 1 } : i
      );
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(prevCarrinho => prevCarrinho.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * Number(item.quantidade)), 0);
  };

  const obterQuantidadeNoCarrinho = (produtoId) => {
    const item = carrinho.find(item => item.id === produtoId);
    return item ? Number(item.quantidade) : 0;
  };

  const handleEnviarWhatsApp = () => {
    enviarParaWhatsApp(carrinho, calcularTotal(), mesaAtual, observacoes);
    setObservacoes('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header 
        mesaAtual={mesaAtual}
        isAdmin={isAdmin}
        contadorCarrinho={carrinho.reduce((total, item) => total + Number(item.quantidade), 0)}
        onAbrirCarrinho={() => setMostrarCarrinho(!mostrarCarrinho)}
        onAbrirLogin={() => setMostrarLogin(true)}
        onLogout={fazerLogout}
        onAbrirQRCodes={() => setMostrarQRCodes(true)}
      />

      <div className="container mx-auto px-4 py-10">
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
                onDeletar={deletarProduto}
              />
            ))}
          </div>
        </section>

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
                onDeletar={deletarProduto}
              />
            ))}
          </div>
        </section>
      </div>

      <BotaoFinalizar 
        totalItens={carrinho.reduce((total, item) => total + Number(item.quantidade), 0)}
        onClick={() => setMostrarCarrinho(true)}
        mostrarCarrinho={mostrarCarrinho}
      />

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