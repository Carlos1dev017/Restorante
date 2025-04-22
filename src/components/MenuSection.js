import React from 'react';
import MenuItem from './MenuItem';

function MenuSection({ title, items, onAddToCart }) {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-') + '-section';
  const headingId = title.toLowerCase().replace(/\s+/g, '-') + '-heading';

  return (
    <section id={sectionId} aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      <div className="menu-items-container">
        {/* Mapeia os itens para renderizar MenuItem para cada um */}
        {items.map(item => (
          <MenuItem
            key={item.id} // Chave única é crucial para listas no React
            item={item}
            onAddToCart={onAddToCart} // Passa a função para o filho
          />
        ))}
      </div>
    </section>
  );
}

export default MenuSection;