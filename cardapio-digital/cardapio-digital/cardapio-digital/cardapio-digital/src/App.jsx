import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Send, Edit, Lock, LogOut, X, Save } from 'lucide-react';
import { CONFIG, validarConfiguracao } from './config/configuracoes';

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
  const [numeroMesas, setNumeroMesas] = useState(10);
  const [observacoes, setObservacoes] = useState('');
<<<<<<< HEAD:src/App.jsx
  
=======
>>>>>>> 11fd6e63c3b5111aabeb477cbf9e887a44257e66:cardapio-digital/src/App.jsx
  
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

  // Validar configurações ao carregar
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

  const enviarParaWhatsApp = () => {
    if (carrinho.length === 0) {
      alert('Adicione itens ao carrinho primeiro!');
      return;
    }

    let mensagem = '* NOVO PEDIDO*\n';
    
    if (mesaAtual) {
      mensagem += `* MESA ${mesaAtual}*\n`;
    }
    
    mensagem += '\n';
    
    carrinho.forEach(item => {
      mensagem += `*${item.quantidade}x ${item.nome}*\n`;
      mensagem += `R$ ${item.preco.toFixed(2)} cada\n`;
      mensagem += `Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
    });
    
    mensagem += `*TOTAL: R$ ${calcularTotal().toFixed(2)}*`;

    if (observacoes.trim()) {
      mensagem += `\n\n*📝 OBSERVAÇÕES:*\n${observacoes}`;
    }

<<<<<<< HEAD:src/App.jsx
    const numeroWhatsApp = CONFIG.whatsapp.numero;
=======
    const numeroWhatsApp = '554796305604';
>>>>>>> 11fd6e63c3b5111aabeb477cbf9e887a44257e66:cardapio-digital/src/App.jsx
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    setObservacoes('');
  };

  const CardProduto = ({ produto, categoria }) => {
    const quantidadeNoCarrinho = obterQuantidadeNoCarrinho(produto.id);

    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 relative border border-gray-200">
        {isAdmin && (
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <button
              onClick={() => abrirModalEditar(produto)}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-lg"
              title="Editar produto"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => deletarProduto(produto)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
              title="Deletar produto"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
        
        <div className="relative">
          <img src={produto.imagem} alt={produto.nome} className="w-full h-52 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40"></div>
        </div>
        
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-800 mb-2">{produto.nome}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{produto.descricao}</p>
          
          <div className="flex justify-between items-center mb-4">
            <span className={`text-3xl font-bold ${categoria === 'hamburgueres' ? 'text-red-600' : 'text-blue-600'}`}>
              R$ {produto.preco.toFixed(2)}
            </span>
          </div>

          {quantidadeNoCarrinho === 0 ? (
            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className={`w-full ${categoria === 'hamburgueres' 
                ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
              } text-white py-3 rounded-xl transition font-semibold flex items-center justify-center gap-2 shadow-lg`}
            >
              <Plus size={20} />
              Adicionar
            </button>
          ) : (
            <div className="flex items-center justify-between bg-gray-100 rounded-xl p-2 shadow-inner">
              <button
                onClick={() => diminuirQuantidade(produto.id)}
                className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition shadow-md"
              >
                <Minus size={20} />
              </button>
              
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 uppercase font-semibold">Quantidade</span>
                <span className="text-2xl font-bold text-gray-800">{quantidadeNoCarrinho}</span>
              </div>
              
              <button
                onClick={() => aumentarQuantidade(produto.id)}
                className="bg-green-600 hover:bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center transition shadow-md"
              >
                <Plus size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl sticky top-0 z-50 border-b-4 border-orange-400">
        <div className="container mx-auto px-4 py-6">
          {mesaAtual && (
            <div className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl mb-4 text-center font-bold text-lg shadow-xl animate-pulse">
              📍 MESA {mesaAtual}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold drop-shadow-lg text-gray-900">{CONFIG.loja.nome}</h1>
              <p className="text-orange-100 text-sm mt-1">{CONFIG.loja.slogan}</p>
            </div>
          
            <div className="flex items-center gap-3">
              {!mesaAtual && isAdmin && (
                <button
                  onClick={() => setMostrarQRCodes(true)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition shadow-lg flex items-center gap-2"
                >
                  <span className="text-xl">🔲</span>
                  QR Codes
                </button>
              )}

              {!mesaAtual && !isAdmin ? (
                <button
                  onClick={() => setMostrarLogin(true)}
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition shadow-lg flex items-center gap-2 font-semibold"
                >
                  <Lock size={18} />
                  Admin
                </button>
              ) : !mesaAtual && isAdmin ? (
                <button
                  onClick={fazerLogout}
                  className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition shadow-lg flex items-center gap-2 font-semibold"
                >
                  <LogOut size={18} />
                  Sair
                </button>
              ) : null}

              <button
                onClick={() => setMostrarCarrinho(!mostrarCarrinho)}
                className="relative bg-white text-orange-600 p-3 rounded-full hover:bg-orange-50 transition shadow-xl"
              >
                <ShoppingCart size={24} />
                {carrinho.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {carrinho.reduce((total, item) => total + Number(item.quantidade), 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

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
              <CardProduto key={produto.id} produto={produto} categoria="hamburgueres" />
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
              <CardProduto key={produto.id} produto={produto} categoria="bebidas" />
            ))}
          </div>
        </section>
      </div>

      {carrinho.length > 0 && !mostrarCarrinho && (
          <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4">
            <button
              onClick={() => setMostrarCarrinho(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-2xl flex items-center gap-2 md:gap-3 font-bold text-base md:text-lg transition-all animate-pulse hover:animate-none max-w-xs md:max-w-md"
            >
              <ShoppingCart size={24} className="flex-shrink-0" />
              <span className="hidden sm:inline">Finalizar Pedido</span>
              <span className="sm:hidden">Finalizar</span>
              <span className="bg-white text-green-600 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-extrabold flex-shrink-0">
                {carrinho.reduce((total, item) => total + Number(item.quantidade), 0)}
              </span>
            </button>
          </div>
      )}

      {mostrarLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">🔐 Login Admin</h2>
              <button onClick={() => setMostrarLogin(false)} className="text-gray-500 hover:text-gray-900">
                <X size={28} />
              </button>
            </div>
            
            <input
              type="password"
              placeholder="Digite a senha"
              value={senhaDigitada}
              onChange={(e) => setSenhaDigitada(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fazerLogin()}
              className="w-full px-4 py-4 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl mb-4 focus:outline-none focus:border-red-500 placeholder-gray-400"
            />
            
            <button
              onClick={fazerLogin}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl hover:from-red-700 hover:to-orange-700 transition font-bold text-lg shadow-xl"
            >
              Entrar
            </button>
            
            <p className="text-sm text-gray-600 mt-4 text-center">
              Senha padrão: admin123
            </p>
          </div>
        </div>
      )}

      {mostrarModal && produtoEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {modoEdicao === 'adicionar' ? '➕ Adicionar Produto' : '✏️ Editar Produto'}
              </h2>
              <button onClick={() => setMostrarModal(false)} className="text-gray-500 hover:text-gray-900">
                <X size={28} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do Produto</label>
                <input
                  type="text"
                  value={produtoEditando.nome}
                  onChange={(e) => setProdutoEditando({...produtoEditando, nome: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Ex: X-Bacon Especial"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={produtoEditando.descricao}
                  onChange={(e) => setProdutoEditando({...produtoEditando, descricao: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Ex: Pão, hambúrguer 150g, bacon, queijo..."
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={produtoEditando.preco}
                  onChange={(e) => setProdutoEditando({...produtoEditando, preco: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Ex: 22.90"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Imagem do Produto</label>
                <div className="flex gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        if (file.size > 1024 * 1024) {
                          alert('Imagem muito grande! Máximo 1MB.');
                          e.target.value = '';
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProdutoEditando({...produtoEditando, imagem: reader.result});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setProdutoEditando({...produtoEditando, imagem: ''})}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition border border-gray-200"
                  >
                    Limpar
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  📁 JPG, PNG, WEBP | Max: 1MB | Dica: comprima em tinypng.com
                </p>
              </div>

              {produtoEditando.imagem && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">✅ Preview</label>
                  <div className="relative">
                    <img 
                      src={produtoEditando.imagem} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-xl border-4 border-green-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setMostrarModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition font-semibold border border-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={salvarProduto}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-semibold flex items-center justify-center gap-2 shadow-xl"
              >
                <Save size={20} />
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarQRCodes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-blue-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-blue-900">🔲 Gerador de QR Codes</h2>
              <button onClick={() => setMostrarQRCodes(false)} className="text-blue-700 hover:text-blue-900">
                <X size={28} />
              </button>
            </div>

            <div className="bg-blue-100 bg-opacity-60 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-blue-900 mb-2">📋 Como usar:</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Defina quantas mesas você tem</li>
                <li>Baixe os QR Codes</li>
                <li>Imprima e cole nas mesas</li>
                <li>Clientes escaneiam e o pedido vem identificado!</li>
              </ol>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Quantas mesas?
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={numeroMesas}
                onChange={(e) => setNumeroMesas(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-white border-2 border-blue-200 text-blue-900 rounded-xl focus:outline-none focus:border-red-500 text-lg"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: numeroMesas }, (_, i) => i + 1).map(mesa => {
                const urlMesa = `${window.location.origin}${window.location.pathname}?mesa=${mesa}`;
                const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(urlMesa)}`;
                
                return (
                  <div key={mesa} className="bg-gray-50 rounded-xl p-4 text-center border-2 border-blue-200 hover:border-orange-500 transition">
                    <div className="bg-white p-2 rounded-lg mb-2">
                      <img 
                        src={qrCodeUrl} 
                        alt={`QR Code Mesa ${mesa}`}
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="font-bold text-lg text-blue-900">Mesa {mesa}</p>
                    <a
                      href={qrCodeUrl}
                      download={`mesa-${mesa}.png`}
                      className="text-xs text-cyan-600 hover:text-cyan-500 underline mt-1 inline-block"
                    >
                      Baixar PNG
                    </a>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-900">
                <strong>💡 Dica:</strong> Imprima em papel adesivo ou plastifique!
              </p>
            </div>
          </div>
        </div>
      )}

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

                  <div className="border-t-2 border-gray-200 pt-6 mt-6">
                    <div className="mb-4">
<<<<<<< HEAD:src/App.jsx
                      {CONFIG.observacoes.habilitado && (
                      <>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {CONFIG.observacoes.label}
                        </label>
                        <textarea
                          value={observacoes}
                          onChange={(e) => setObservacoes(e.target.value)}
                          placeholder={CONFIG.observacoes.placeholder}
                            />
                        </>
                      )}
=======
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📝 Observações (opcional)
                      </label>
                      <textarea
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        placeholder="Ex: Sem cebola, bem passado, maionese extra..."
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-red-500 text-sm resize-none"
                        rows="3"
                      />
>>>>>>> 11fd6e63c3b5111aabeb477cbf9e887a44257e66:cardapio-digital/src/App.jsx
                    </div>

                    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl">
                      <span className="text-xl font-bold text-gray-700">TOTAL:</span>
                      <span className="text-4xl font-bold text-red-600">
                        R$ {calcularTotal().toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={enviarParaWhatsApp}
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