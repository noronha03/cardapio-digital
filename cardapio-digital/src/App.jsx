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

      {mostrarCarrinho && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end backdrop-blur-sm">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl border-l-4 border-orange-400">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">🛒 Seu Pedido</h2>
                <button
                  onClick={() => setMostrarCarrinho(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {carrinho.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-600 text-lg">Seu carrinho está vazio</p>
                  <p className="text-gray-500 text-sm mt-2">Adicione itens deliciosos!</p>
                </div>
              ) : (
                <>
                  {carrinho.map(item => (
                    <div key={item.id} className="bg-white rounded-xl p-4 mb-4 shadow border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">{item.nome}</h3>
                          <p className="text-red-600 font-semibold mt-1">R$ {item.preco.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removerDoCarrinho(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                          <button
                            onClick={() => diminuirQuantidade(item.id)}
                            className="bg-red-500 text-white hover:bg-red-600 w-9 h-9 rounded-lg flex items-center justify-center transition"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="font-bold text-xl text-gray-900 w-10 text-center">{item.quantidade}</span>
                          <button
                            onClick={() => aumentarQuantidade(item.id)}
                            className="bg-green-600 text-white hover:bg-green-700 w-9 h-9 rounded-lg flex items-center justify-center transition"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Subtotal</p>
                          <p className="font-bold text-xl text-gray-900">
                            R$ {(item.preco * item.quantidade).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="w-full border-t-2 border-gray-200 pt-6 mt-6">
                    <div className="mb-4">
                      {CONFIG.observacoes.habilitado && (
                        <>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {CONFIG.observacoes.label}
                          </label>

                          <textarea
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                            placeholder={CONFIG.observacoes.placeholder}
                            rows={3}
                            className="
                              w-full
                              px-3 py-2
                              bg-gray-50
                              border-2 border-gray-200
                              rounded-xl
                              text-sm
                              focus:outline-none focus:border-red-500
                              resize-none
                            "
                          />
                        </>
                      )}
                    </div>
                    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl">
                      <span className="text-xl font-bold text-gray-700">TOTAL:</span>
                      <span className="text-4xl font-bold text-red-600">
                        R$ {calcularTotal().toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={handleEnviarWhatsApp}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-xl font-bold text-xl hover:from-green-700 hover:to-emerald-700 transition shadow-2xl flex items-center justify-center gap-3"
                    >
                      <Send size={26} />
                      Enviar Pedido via WhatsApp
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}