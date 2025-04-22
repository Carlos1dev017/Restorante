import React, { useState, useEffect } from 'react';
import './App.css'; // Importa os estilos

// Importa os dados e componentes
import { menuData } from './data/menuData';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MenuSection from './components/MenuSection';
import Cart from './components/Cart';
import Notification from './components/Notification';
import Footer from './components/Footer';

function App() {
  // --- Estados ---
  const [cartItems, setCartItems] = useState([]); // Itens no carrinho
  const [notification, setNotification] = useState(''); // Mensagem de notificação
  const [isCartVisible, setIsCartVisible] = useState(false); // Visibilidade do carrinho

  // --- Funções ---
  // Adiciona item ao carrinho
  const handleAddToCart = (itemToAdd) => {
    setCartItems(prevItems => [...prevItems, itemToAdd]);
    setNotification(`${itemToAdd.name} foi adicionado ao carrinho!`);

    // Limpa a notificação após 3 segundos
    const timer = setTimeout(() => {
      setNotification('');
    }, 3000);
    // É uma boa prática limpar o timer se o componente desmontar antes
    // return () => clearTimeout(timer); // Isso funciona melhor dentro de um useEffect
  };

  // Limpa a notificação (pode ser usado em useEffect)
  useEffect(() => {
    if (notification) {
        const timer = setTimeout(() => {
            setNotification('');
        }, 3000);
        return () => clearTimeout(timer); // Limpa o timer ao desmontar ou se a notificação mudar
    }
  }, [notification]); // Executa quando a 'notification' muda


  // Mostra/esconde o carrinho
  const toggleCartVisibility = () => {
    setIsCartVisible(prevVisible => !prevVisible);
  };

  // Função para fechar o carrinho (passada para o componente Cart)
  const handleCloseCart = () => {
      setIsCartVisible(false);
  };

  // --- Preparação dos Dados para Renderização ---
  // Agrupa os itens do menu por categoria
  const groupedMenu = menuData.reduce((acc, item) => {
    const category = item.category || 'Outros'; // Categoria padrão
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Define a ordem desejada das categorias
  const categoryOrder = ['Entradas', 'Pratos Principais', 'Sobremesas', 'Outros'];

  return (
    <div className="App">
      {/* Passa a contagem de itens e a função de toggle para o Header */}
      <Header cartItemCount={cartItems.length} onToggleCart={toggleCartVisibility} />

      <Navigation />

      {/* Mostra a notificação se houver mensagem */}
      <Notification message={notification} />

      <main id="menu-container">
        {/* Renderiza as seções na ordem definida */}
        {categoryOrder.map(categoryName => {
          // Verifica se a categoria existe nos dados agrupados
          if (groupedMenu[categoryName]) {
            return (
              <MenuSection
                key={categoryName} // Chave única para a seção
                title={categoryName}
                items={groupedMenu[categoryName]}
                onAddToCart={handleAddToCart} // Passa a função para adicionar ao carrinho
              />
            );
          }
          return null; // Não renderiza nada se a categoria não tiver itens
        })}
      </main>

      {/* Renderiza o Carrinho condicionalmente */}
      {isCartVisible && <Cart items={cartItems} onClose={handleCloseCart}/>}

      <Footer />
    </div>
  );
}

export default App;