import React from 'react';
import { formatPrice } from '../data/menuData'; // Importa a função

function MenuItem({ item, onAddToCart }) {
  // Verifica se o item existe para evitar erros
  if (!item) return null;

  // Lógica para exibir preço normal ou promocional
  let priceDisplay;
  if (typeof item.promoPrice === 'number' && item.promoPrice < item.price) {
    priceDisplay = (
      <>
        <p className="preco-promocao">{formatPrice(item.price)}</p>
        <p className="preco">{formatPrice(item.promoPrice)}</p>
      </>
    );
  } else {
    priceDisplay = <p className="preco">{formatPrice(item.price)}</p>;
  }

  const addButtonLabel = `Adicionar ${item.name} ao carrinho, preço ${formatPrice(item.promoPrice ?? item.price)}`;

  return (
    <article className="menu-item" data-id={item.id}>
      {/* Usa imageSrc diretamente pois são URLs externas */}
      <img
        src={item.imageSrc}
        alt={item.imageAlt || item.name}
        className="menu-item-image"
        loading="lazy"
        width="200" 
        height="150" 
      />
      <div className="item-details">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="price-section">
          {priceDisplay}
        </div>
        {/* Botão chama a função passada via props */}
        <button
          className="add-to-cart-btn"
          aria-label={addButtonLabel}
          onClick={() => onAddToCart(item)} // Chama onAddToCart com o item atual
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </article>
  );
}

export default MenuItem;