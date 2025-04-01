const menuData = [
  {
      id: "paillard-filet",
      category: "Pratos Principais",
      name: "Paillard de filet",
      description: "Paillard de filet, recheado com queijo emmental, acompanha risoto de palmito com alho poró.",
      price: 85.50,
      promoPrice: 90.00,
      imageSrc: "https://www.socialbauru.com.br/wp-content/uploads/2024/05/categoria-prato-principal-1.jpg",
      imageAlt: "Prato Paillard de filet com risoto.",
      isVegetarian: false,
      isGlutenFree: false // Risoto pode conter glúten dependendo do preparo
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
      isGlutenFree: true // Assumindo que molho e acompanhamentos são GF
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
      isGlutenFree: true // Se batatas não forem contaminadas e sem pão
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
      isGlutenFree: true // Assumindo farofa de mandioca e sem contaminação
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
      isVegetarian: true, // Geralmente é
      isGlutenFree: false // Contém farinha de trigo
  },
];


// --- Parte 1: Acessibilidade (Menu Toggle) ---
const menuToggle = document.querySelector('.menu-toggle');
// Selecionar pelo ID definido no HTML para o menu
const menu = document.querySelector('#main-menu');

// Verifica se ambos os elementos existem antes de adicionar listeners
if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
  });

  // Fechar o menu se clicar fora dele
  document.addEventListener('click', (event) => {
      const isClickInsideMenu = menu.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);

      if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('active')) {
          menu.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Abrir menu');
      }
  });

   // Fechar menu ao pressionar ESC
   document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('active')) {
          menu.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Abrir menu');
          menuToggle.focus();
      }
  });
} else {
  // Log de erro se um dos elementos não for encontrado
  console.error("Elemento .menu-toggle ou #main-menu não encontrado no DOM.");
}


// --- Parte 2: Componentização com JavaScript ---

/**
* Cria o HTML para um item do cardápio usando Template Literals.
* @param {object} item - O objeto contendo os dados do item.
* @returns {string} - O HTML do componente do item.
*/
function createMenuItemHTML(item) {
  // Verifica se o item e as propriedades essenciais existem
  if (!item || typeof item.price !== 'number' || !item.name || !item.imageSrc || !item.imageAlt || !item.description) {
      console.error('Dados inválidos para o item:', item);
      return ''; // Retorna string vazia para não quebrar o layout
  }

  const formatPrice = (value) => {
      // Garante que temos um número antes de formatar
      if (typeof value !== 'number' || isNaN(value)) return 'Preço indisponível';
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  let priceHTML = `<p class="preco">${formatPrice(item.price)}</p>`;
  // Verifica se promoPrice é um número e maior que o preço atual
  if (typeof item.promoPrice === 'number' && !isNaN(item.promoPrice) && item.promoPrice > item.price) {
      priceHTML = `
          <p class="preco-promocao">${formatPrice(item.promoPrice)}</p>
          <p class="preco">${formatPrice(item.price)}</p>
      `;
  }

  const addButtonLabel = `Adicionar ${item.name} ao carrinho, preço ${formatPrice(item.price)}`;

  return `
      <article class="menu-item" data-id="${item.id}">
          <img src="${item.imageSrc}" alt="${item.imageAlt}">
          <div class="item-details">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <div class="price-section">
                  ${priceHTML}
              </div>
              <button class="add-to-cart-btn" aria-label="${addButtonLabel}">
                  Adicionar ao Carrinho
              </button>
          </div>
      </article>
  `;
}

/**
* Renderiza o cardápio completo no container especificado.
* @param {Array<object>} data - Array com os dados dos itens do menu.
* @param {HTMLElement} container - O elemento DOM onde o menu será renderizado.
*/
function renderMenu(data, container) {
  if (!container) {
      console.error("Container do menu (#menu-container) não encontrado!");
      return;
  }
  if (!Array.isArray(data)) {
      console.error("Dados do menu não são um array válido!");
      container.innerHTML = '<p>Erro ao carregar o cardápio.</p>';
      return;
  }

  container.innerHTML = ''; // Limpa o container

  const categories = data.reduce((acc, item) => {
      // Usa "Outros" se a categoria não estiver definida no item
      const category = item.category || 'Outros';
      if (!acc[category]) {
          acc[category] = [];
      }
      acc[category].push(item);
      return acc;
  }, {});

  const categoryOrder = ['Entradas', 'Pratos Principais', 'Sobremesas', 'Outros'];

  categoryOrder.forEach(categoryName => {
      if (categories[categoryName]) {
          const items = categories[categoryName];
          const sectionId = categoryName.toLowerCase().replace(/\s+/g, '-') + '-section';
          const headingId = categoryName.toLowerCase().replace(/\s+/g, '-') + '-heading';

          const section = document.createElement('section');
          section.id = sectionId;
          section.setAttribute('aria-labelledby', headingId);

          const heading = document.createElement('h2');
          heading.id = headingId;
          heading.textContent = categoryName;
          section.appendChild(heading);

          const itemsContainer = document.createElement('div');
          itemsContainer.className = 'menu-items-container';

          items.forEach(item => {
              const itemHTML = createMenuItemHTML(item);
              // Só adiciona se o HTML não for vazio (evita adicionar itens com erro)
              if (itemHTML) {
                  itemsContainer.innerHTML += itemHTML;
              }
          });

          section.appendChild(itemsContainer);
          container.appendChild(section);
      }
  });

  // Adiciona event listeners aos botões DEPOIS de adicionar tudo ao DOM
  const addButtons = container.querySelectorAll('.add-to-cart-btn');
  addButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const article = event.target.closest('.menu-item');
          if (!article) return; // Segurança extra

          const itemId = article.dataset.id;
          const item = menuData.find(i => i.id === itemId);

          if (item) {
              console.log(`Adicionar "${item.name}" (ID: ${itemId}) ao carrinho!`);
              alert(`${item.name} adicionado ao carrinho! (simulação)`);
              // Implementar lógica real do carrinho aqui
          } else {
              console.error(`Item com ID ${itemId} não encontrado nos dados.`);
          }
      });
  });
}

// --- Inicialização ---
// Garante que o DOM está pronto antes de executar o script de renderização
document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menu-container');
  // Verifica se o container existe antes de tentar renderizar
  if (menuContainer) {
      renderMenu(menuData, menuContainer);
  } else {
      console.error("Elemento #menu-container não encontrado no DOM ao inicializar.");
  }
});