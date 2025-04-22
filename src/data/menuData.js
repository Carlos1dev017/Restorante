export const menuData = [
    {
        id: "paillard-filet",
        category: "Pratos Principais",
        name: "Paillard de filet",
        description: "Paillard de filet, recheado com queijo emmental, acompanha risoto de palmito com alho poró.",
        price: 85.50,
        promoPrice: 90.00, // Manter null se não houver promoção
        imageSrc: "https://www.socialbauru.com.br/wp-content/uploads/2024/05/categoria-prato-principal-1.jpg",
        imageAlt: "Prato Paillard de filet com risoto.",
        isVegetarian: false,
        isGlutenFree: false
    },
    {
        id: "gold-arripa",
        category: "Pratos Principais",
        name: "Gold arripa mustard",
        description: "Costela suína pincelada com molho Barbecue Mustard Old Gold, acompanha purê com totopos, bacon e chimichurri.",
        price: 199.98,
        promoPrice: null,
        imageSrc: "https://www.socialbauru.com.br/wp-content/uploads/2024/05/categoria-prato-principal-2.jpg",
        imageAlt: "Prato Gold arripa mustard com costela suína e purê.",
        isVegetarian: false,
        isGlutenFree: true
    },
    {
        id: "steak-tartare",
        category: "Entradas",
        name: "Steak tartare",
        description: "Steak tartare com batatas rústicas e mix de folhas com rabanete laminadas e tomate cereja.",
        price: 90.00,
        promoPrice: null,
        imageSrc: "https://www.socialbauru.com.br/wp-content/uploads/2024/05/categoria-prato-principal-3.jpg",
        imageAlt: "Prato Steak tartare com batatas rústicas e salada.",
        isVegetarian: false,
        isGlutenFree: true
    },
    {
        id: "file-brasil",
        category: "Pratos Principais",
        name: "Filé meu Brasil brasileiro",
        description: "Um suculento filé preparado à moda brasileira, acompanhado de farofa e vinagrete.",
        price: 200.00,
        promoPrice: null,
        imageSrc: "https://www.socialbauru.com.br/wp-content/uploads/2024/05/premioimpera2019-principal-comprando-1024x683-1.jpg",
        imageAlt: "Prato Filé meu Brasil brasileiro com acompanhamentos.",
        isVegetarian: false,
        isGlutenFree: true
    },
    {
        id: "petit-gateau",
        category: "Sobremesas",
        name: "Petit Gateau",
        description: "Clássico bolinho de chocolate com interior cremoso, servido com sorvete de creme.",
        price: 35.00,
        promoPrice: null,
        imageSrc: "https://receitadaboa.com.br/wp-content/uploads/2024/09/iStock-506300124.jpg",
        imageAlt: "Petit Gateau de chocolate com uma bola de sorvete ao lado.",
        isVegetarian: true,
        isGlutenFree: false
    },
    // Adicione mais itens se tiver...
  ];
  
  // Função auxiliar para formatar preço (pode ficar aqui ou em um utils.js)
  export const formatPrice = (value) => {
      if (typeof value !== 'number' || isNaN(value)) return 'N/A';
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }