// ========================================
// 📝 CONFIGURAÇÕES DO CARDÁPIO
// ========================================
// EDITE APENAS ESTE ARQUIVO para personalizar!
// ========================================

export const CONFIG = {
  
  // ========================================
  // 🏪 INFORMAÇÕES DA LOJA
  // ========================================
  loja: {
    nome: "🍔 Burger House",
    slogan: "Os melhores hambúrgueres da cidade",
    
    // Emoji/Ícone da loja
    icone: "🍔",
  },

  // ========================================
  // 📱 WHATSAPP
  // ========================================
  whatsapp: {
    // SEU NÚMERO (formato: 55 + DDD + número)
    // Exemplo: (47) 99630-5604 = 5547996305604
    numero: "554796305604",
  },

  // ========================================
  // 🔐 ACESSO ADMIN
  // ========================================
  admin: {
    // ⚠️ TROQUE ESTA SENHA!
    senha: "admin123",
  },

  // ========================================
  // 🎨 CORES DO TEMA
  // ========================================
  tema: {
    // Cores do header (topo)
    corHeader: "from-red-600 to-orange-600",
    
    // Cor de fundo da página
    corFundoPagina: "from-orange-50 to-red-50",
    
    // Cores das categorias
    coresCategorias: {
      hamburgueres: {
        primaria: "red-600",      // Cor do preço
        gradiente: "from-red-600 to-orange-600",  // Botão
        gradienteHover: "from-red-700 to-orange-700",
      },
      bebidas: {
        primaria: "blue-600",
        gradiente: "from-blue-600 to-cyan-600",
        gradienteHover: "from-blue-700 to-cyan-700",
      },
    },
  },

  // ========================================
  // 🔲 QR CODES
  // ========================================
  qrCodes: {
    // Número padrão de mesas
    mesasPadrao: 10,
    
    // Tamanho do QR Code em pixels
    tamanho: 300,
  },

  // ========================================
  // 📋 OBSERVAÇÕES NO PEDIDO
  // ========================================
  observacoes: {
    // Habilitar campo de observações?
    habilitado: true,
    
    // Placeholder do campo
    placeholder: "Ex: Sem cebola, bem passado, maionese extra...",
    
    // Label do campo
    label: "📝 Observações (opcional)",
  },

  // ========================================
  // 🍔 PRODUTOS INICIAIS
  // ========================================
  produtosIniciais: {
    hamburgueres: [
      {
        id: 1,
        nome: 'X-Burger Clássico',
        descricao: 'Pão, hambúrguer 150g, queijo, alface, tomate',
        preco: 18.90,
        categoria: 'hamburgueres',
        imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        nome: 'X-Bacon',
        descricao: 'Pão, hambúrguer 150g, queijo, bacon crocante',
        preco: 22.90,
        categoria: 'hamburgueres',
        imagem: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop'
      },
      {
        id: 3,
        nome: 'X-Salada',
        descricao: 'Pão, hambúrguer 150g, queijo, alface, tomate, milho',
        preco: 20.90,
        categoria: 'hamburgueres',
        imagem: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop'
      },
      {
        id: 4,
        nome: 'X-Tudo',
        descricao: 'Pão, hambúrguer 180g, queijo, bacon, ovo, salada',
        preco: 28.90,
        categoria: 'hamburgueres',
        imagem: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop'
      }
    ],
    bebidas: [
      {
        id: 5,
        nome: 'Coca-Cola 350ml',
        descricao: 'Refrigerante lata',
        preco: 5.00,
        categoria: 'bebidas',
        imagem: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop'
      },
      {
        id: 6,
        nome: 'Suco Natural',
        descricao: 'Laranja, limão ou morango - 500ml',
        preco: 8.00,
        categoria: 'bebidas',
        imagem: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop'
      },
      {
        id: 7,
        nome: 'Água Mineral',
        descricao: 'Garrafa 500ml',
        preco: 3.00,
        categoria: 'bebidas',
        imagem: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop'
      }
    ]
  },

  // ========================================
  // ⚙️ CONFIGURAÇÕES AVANÇADAS
  // ========================================
  avancado: {
    // Limite de tamanho de imagem (em MB)
    limiteImagemMB: 1,
    
    // Salvar produtos no localStorage?
    salvarNoLocalStorage: true,
    
    // Esconder botões admin quando tiver mesa?
    esconderAdminComMesa: true,
  },
};

// ========================================
// 🎨 FUNÇÕES AUXILIARES DE CORES
// ========================================

/**
 * Obtém as cores de uma categoria
 */
export const obterCoresCatehoria = (categoria) => {
  return CONFIG.tema.coresCategorias[categoria] || CONFIG.tema.coresCategorias.hamburgueres;
};

/**
 * Valida se as configurações estão corretas
 */
export const validarConfiguracao = () => {
  const erros = [];
  const avisos = [];

  // Validar número WhatsApp
  if (!CONFIG.whatsapp.numero || CONFIG.whatsapp.numero.length < 12) {
    erros.push("⚠️ Número do WhatsApp inválido! Use formato: 5547999999999");
  }

  // Avisar sobre senha padrão
  if (CONFIG.admin.senha === "admin123") {
    avisos.push("⚠️ ATENÇÃO: Troque a senha padrão do admin!");
  }

  // Validar produtos iniciais
  const totalProdutos = 
    (CONFIG.produtosIniciais.hamburgueres?.length || 0) + 
    (CONFIG.produtosIniciais.bebidas?.length || 0);
  
  if (totalProdutos === 0) {
    avisos.push("ℹ️ Nenhum produto inicial configurado.");
  }

  // Exibir resultados
  if (erros.length > 0) {
    console.error("❌ ERROS DE CONFIGURAÇÃO:", erros);
    erros.forEach(erro => console.error(erro));
  }

  if (avisos.length > 0) {
    console.warn("⚠️ AVISOS:", avisos);
    avisos.forEach(aviso => console.warn(aviso));
  }

  if (erros.length === 0 && avisos.length === 0) {
    console.log("✅ Configurações válidas!");
  }

  return erros.length === 0;
};

// ========================================
// 📖 GUIA RÁPIDO DE EDIÇÃO
// ========================================

/*

🎯 PRINCIPAIS EDIÇÕES:

1️⃣ TROCAR NOME DA LOJA:
   loja: {
     nome: "🍕 Pizzaria do João",  ← AQUI
     slogan: "As melhores pizzas",  ← AQUI
   }

2️⃣ TROCAR WHATSAPP:
   whatsapp: {
     numero: "5511987654321",  ← AQUI
   }

3️⃣ TROCAR SENHA:
   admin: {
     senha: "minhasenha123",  ← AQUI
   }

4️⃣ MUDAR CORES:
   tema: {
     corHeader: "from-blue-600 to-cyan-600",  ← AQUI
     corFundoPagina: "from-blue-50 to-cyan-50",  ← AQUI
   }

5️⃣ DESABILITAR OBSERVAÇÕES:
   observacoes: {
     habilitado: false,  ← AQUI
   }

*/