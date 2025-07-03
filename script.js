// DADOS DOS PRATOS
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
];

// --- Parte 1: Acessibilidade (Menu Toggle) ---
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            menuToggle.focus();
        }
    });
} else {
    console.error("Elemento .menu-toggle ou #main-menu não encontrado no DOM.");
}


// --- Parte 2: Componentização e Otimizações de Imagem ---

/**
 * Cria o HTML para um item do cardápio com otimizações de imagem.
 * @param {object} item - O objeto contendo os dados do item.
 * @returns {string} - O HTML do componente do item.
 */
function createMenuItemHTML(item) {
    if (!item || typeof item.price !== 'number' || !item.name || !item.imageSrc || !item.imageAlt || !item.description) {
        console.error('Dados inválidos para o item:', item);
        return '';
    }

    const formatPrice = (value) => {
        if (typeof value !== 'number' || isNaN(value)) return 'Preço indisponível';
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    let priceHTML = `<p class="preco">${formatPrice(item.price)}</p>`;
    if (typeof item.promoPrice === 'number' && !isNaN(item.promoPrice) && item.promoPrice > item.price) {
        priceHTML = `
            <p class="preco-promocao">${formatPrice(item.promoPrice)}</p>
            <p class="preco">${formatPrice(item.price)}</p>
        `;
    }

    const addButtonLabel = `Adicionar ${item.name} ao carrinho, preço ${formatPrice(item.price)}`;

    // ======================================================================
    // ✨ INÍCIO DAS OTIMIZAÇÕES DE IMAGEM (ATIVIDADE B2.P1.A6) ✨
    // ======================================================================

    // Bloco 3: Evita CLS (Layout Shift) definindo as dimensões da imagem.
    // ***** ATENÇÃO: SUBSTITUA 250 E 180 PELOS VALORES REAIS DA SUA IMAGEM! *****
    const imageWidth = "250";  // <--- TROQUE ESTE VALOR PELA LARGURA REAL
    const imageHeight = "180"; // <--- TROQUE ESTE VALOR PELA ALTURA REAL

    // Bloco 2: Garante um alt text descritivo e seguro para acessibilidade e SEO.
    const altText = item.imageAlt || `Imagem do prato ${item.name}`;

    // Montando a tag de imagem otimizada com todos os atributos.
    const imageHTML = `
        <img 
            class="menu-item-image"
            src="${item.imageSrc}" 
            alt="${altText}" 
            width="${imageWidth}" 
            height="${imageHeight}" 
            loading="lazy"
        >`;
    // ======================================================================
    // ✨ FIM DAS OTIMIZAÇÕES DE IMAGEM ✨
    // ======================================================================

    return `
        <article class="menu-item" data-id="${item.id}">
            ${imageHTML} {/* A imagem otimizada é inserida aqui */}
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
 * (Nenhuma alteração necessária nesta função)
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

    container.innerHTML = '';

    const categories = data.reduce((acc, item) => {
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
                if (itemHTML) {
                    itemsContainer.innerHTML += itemHTML;
                }
            });

            section.appendChild(itemsContainer);
            container.appendChild(section);
        }
    });

    const addButtons = container.querySelectorAll('.add-to-cart-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const article = event.target.closest('.menu-item');
            if (!article) return;
            const itemId = article.dataset.id;
            const item = menuData.find(i => i.id === itemId);
            if (item) {
                console.log(`Adicionar "${item.name}" (ID: ${itemId}) ao carrinho!`);
                alert(`${item.name} adicionado ao carrinho! (simulação)`);
            } else {
                console.error(`Item com ID ${itemId} não encontrado nos dados.`);
            }
        });
    });
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        renderMenu(menuData, menuContainer);
    } else {
        console.error("Elemento #menu-container não encontrado no DOM ao inicializar.");
    }
});