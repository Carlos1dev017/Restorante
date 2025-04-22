import React, { useState, useEffect, useRef } from 'react';
import burgerIcon from '../assets/menu-burger.png'; // Importa a imagem do burger

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null); // Ref para o elemento nav

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Efeito para fechar o menu ao clicar fora ou pressionar Esc
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se o clique foi fora do nav e se o menu está aberto
      if (navRef.current && !navRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
        if (event.key === 'Escape' && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }

    // Adiciona listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Função de limpeza para remover listeners quando o componente desmontar
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]); // Re-executa o efeito se isMenuOpen mudar


  return (
    <nav role="navigation" aria-label="Navegação Principal" ref={navRef}>
      <button
        className="menu-toggle"
        aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
        onClick={toggleMenu}
      >
        {/* Usa a imagem importada */}
        <img src={burgerIcon} alt="" aria-hidden="true" />
      </button>

      {/* Aplica a classe 'active' condicionalmente */}
      <ul
        className={`menu ${isMenuOpen ? 'active' : ''}`}
        id="main-menu"
        role="menubar"
        aria-label="Menu principal"
      >
        {/* Links do menu - usar onClick para rolar suavemente se necessário, ou React Router para navegação */}
        <li role="none"><a href="#entradas-section" role="menuitem" onClick={() => setIsMenuOpen(false)}>Entradas</a></li>
        <li role="none"><a href="#pratos-principais-section" role="menuitem" onClick={() => setIsMenuOpen(false)}>Pratos Principais</a></li>
        <li role="none"><a href="#sobremesas-section" role="menuitem" onClick={() => setIsMenuOpen(false)}>Sobremesas</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;