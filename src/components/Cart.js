import React from 'react';
import { formatPrice } from '../data/menuData';

function Cart({ items, onClose }) { // Adiciona prop onClose
  // Agrupa itens pelo ID e conta a quantidade
  const groupedItems = items.reduce((acc, item) => {
    acc[item.id] = acc[item.id] || { ...item, quantity: 0 };
    acc[item.id].quantity++;
    return acc;
  }, {});

  // Calcula o total
  const total = items.reduce((sum, item) => sum + (item.promoPrice ?? item.price), 0);

  return (
    <aside className="cart">
      <div className="cart-header">
          <h2>Meu Carrinho</h2>
          {/* Botão para fechar o carrinho */}
          <button onClick={onClose} className="close-cart-btn" aria-label="Fechar carrinho">×</button>
      </div>

      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {Object.values(groupedItems).map((groupedItem) => (
              <li key={groupedItem.id}>
                {groupedItem.name} (x{groupedItem.quantity}) - {formatPrice((groupedItem.promoPrice ?? groupedItem.price) * groupedItem.quantity)}
                {/* Adicionar botões +/- para alterar quantidade seria um próximo passo */}
              </li>
            ))}
          </ul>
          <hr />
          <p><strong>Total: {formatPrice(total)}</strong></p>
          <button className="checkout-btn">Finalizar Compra (Simulação)</button>
        </>
      )}
    </aside>
  );
}

export default Cart;