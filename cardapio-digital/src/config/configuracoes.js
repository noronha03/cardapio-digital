// ========================================
// 📝 CONFIGURAÇÕES GERAIS DO CARDÁPIO DIGITAL
// ========================================
//
// ⚠️ IMPORTANTE:
// - ESTE É O ARQUIVO PRINCIPAL DE CONFIGURAÇÃO DO SISTEMA
// - QUALQUER PERSONALIZAÇÃO PARA CLIENTES
//   DEVE SER FEITA AQUI
// - NÃO É NECESSÁRIO ALTERAR COMPONENTES
//
// Este arquivo centraliza:
// - Dados da loja
// - WhatsApp
// - Acesso administrativo
// - Tema visual
// - Produtos iniciais
// - Comportamentos avançados
// ========================================

export const CONFIG = {

  // ========================================
  // 🏪 INFORMAÇÕES DA LOJA
  // ========================================
  // Exibidas no HEADER do sistema
  // Impacta identidade visual e branding
  loja: {
    nome: "🍔 Burger House",     // Nome exibido no topo
    slogan: "Os melhores hambúrgueres da cidade", // Subtítulo
    
    // Ícone/emoji representativo da loja
    icone: "🍔",
  },

  // ========================================
  // 📱 CONFIGURAÇÃO DO WHATSAPP
  // ========================================
  // Usado no envio do pedido final
  // ⚠️ Formato obrigatório: 55 + DDD + número
  whatsapp: {
    numero: "554796305604",
  },

  // ========================================
  // 🔐 ACESSO ADMINISTRATIVO
  // ========================================
  // Controla acesso ao modo administrador
  // (editar produtos, gerar QR Codes, etc)
  admin: {
    // ⚠️ SEMPRE trocar a senha em produção
    senha: "admin123",
  },

  // ========================================
  // 🎨 TEMA VISUAL DO SISTEMA
  // ========================================
  // Todas as cores usam classes do TailwindCSS
  tema: {

    // Gradiente do header (topo)
    corHeader: "from-red-600 to-orange-600",
    
    // Fundo geral da aplicação
    corFundoPagina: "from-orange-50 to-red-50",

    // Cores específicas por categoria
    coresCategorias: {

      // Categoria: Hamburgueres
      hamburgueres: {
        primaria: "red-600", // Cor do preço
        gradiente: "from-red-600 to-orange-600", // Botão
        gradienteHover: "from-red-700 to-orange-700",
      },

      // Categoria: Bebidas
      bebidas: {
        primaria: "blue-600",
        gradiente: "from-blue-600 to-cyan-600",
        gradienteHover: "from-blue-700 to-cyan-700",
      },
    },
  },

  // ========================================
  // 🔲 CONFIGURAÇÃO DE QR CODES
  // ========================================
  // Usado no ModalQRCodes
  qrCodes: {

    // Quantidade inicial de mesas
    mesasPadrao: 10,
    
    // Tamanho do QR Code em pixels
    tamanho: 300,
  },

  // ========================================
  // 📋 OBSERVAÇÕES DO PEDIDO
  // ========================================
  // Campo exibido no carrinho
  observacoes: {

    // Ativa ou desativa o campo
    habilitado: true,
    
    // Texto de exemplo no input
    placeholder: "Ex: Sem cebola, bem passado, maionese extra...",
    
    // Label exibido acima do campo
    label: "📝 Observações (opcional)",
  },

  // ========================================
  // 🍔 PRODUTOS INICIAIS DO SISTEMA
  // ========================================
  // Usados como base ao carregar o app
  // Podem ser sobrescritos pelo localStorage
  produtosIniciais: {

    // ----------------
    // HAMBURGUERES
    // ----------------
    hamburgueres: [
      {
        id: 1,
        nome: 'X-Burger Clássico',
        descricao: 'Pão, hambúrguer 150g, queijo, alface, tomate',
        preco: 18.90,
        categoria: 'hamburgueres',
        imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
      },
      // Outros produtos seguem o mesmo padrão
    ],

    // ----------------
    // BEBIDAS
    // ----------------
    bebidas: [
      {
        id: 5,
        nome: 'Coca-Cola 350ml',
        descricao: 'Refrigerante lata',
        preco: 5.00,
        categoria: 'bebidas',
        imagem: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop'
      },
    ]
  },

  // ========================================
  // ⚙️ CONFIGURAÇÕES AVANÇADAS
  // ========================================
  // Controlam comportamento interno do sistema
  avancado: {

    // Tamanho máximo de imagem (MB)
    limiteImagemMB: 5,

    // Persistir produtos no navegador?
    salvarNoLocalStorage: true,

    // Ocultar botões admin quando cliente acessa via mesa?
    esconderAdminComMesa: true,
  },

  // Configurações de Impressão
  impressao: {

    // Liga/desliga impressão automática
    habilitada: false, 

    // Nome da impressora cadastrada
    impressoraNome: '', 

    // Imprime sem janela
    impressaoSilenciosa: true, 
  }
};

// ========================================
// 🎨 FUNÇÕES AUXILIARES
// ========================================

/**
 * Retorna as cores configuradas para uma categoria
 * Se não existir, usa hamburgueres como padrão
 */
export const obterCoresCatehoria = (categoria) => {
  return (
    CONFIG.tema.coresCategorias[categoria] ||
    CONFIG.tema.coresCategorias.hamburgueres
  );
};

/**
 * Valida configurações críticas do sistema
 * Executada na inicialização do app
 */
export const validarConfiguracao = () => {
  const erros = [];
  const avisos = [];

  // Validação do WhatsApp
  if (!CONFIG.whatsapp.numero || CONFIG.whatsapp.numero.length < 12) {
    erros.push("⚠️ Número do WhatsApp inválido! Use formato: 5547999999999");
  }

  // Aviso de segurança
  if (CONFIG.admin.senha === "admin123") {
    avisos.push("⚠️ ATENÇÃO: Troque a senha padrão do admin!");
  }

  // Verificar produtos iniciais
  const totalProdutos =
    (CONFIG.produtosIniciais.hamburgueres?.length || 0) +
    (CONFIG.produtosIniciais.bebidas?.length || 0);

  if (totalProdutos === 0) {
    avisos.push("ℹ️ Nenhum produto inicial configurado.");
  }

  // Logs
  if (erros.length > 0) {
    console.error("❌ ERROS DE CONFIGURAÇÃO:", erros);
  }

  if (avisos.length > 0) {
    console.warn("⚠️ AVISOS:", avisos);
  }

  if (erros.length === 0 && avisos.length === 0) {
    console.log("✅ Configurações válidas!");
  }

  return erros.length === 0;
};
