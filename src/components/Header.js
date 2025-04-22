import React from 'react';
import logoImage from '../assets/Restaurant Logo.png';

function Header({ cartItemCount, onToggleCart }) {
  return (
    <header>
      {}
      <div className="header-title-group">
        {}
        <img
          src={logoImage}
          alt="Logo do Restaurante"
          className="header-logo"
        />
        {}
        <h1>Restaurante</h1>
      </div>

      {/* Botão do carrinho (permanece no mesmo nível do container do título) */}
      <button onClick={onToggleCart} className="cart-button" aria-label={`Ver carrinho (${cartItemCount} itens)`}>
        🛒 Carrinho ({cartItemCount})
      </button>
    </header>
  );
}

export default Header;