import React from 'react';

function Notification({ message }) {
  // Não renderiza nada se não houver mensagem
  if (!message) {
    return null;
  }

  return (
    <div className="notification" role="alert">
      {message}
    </div>
  );
}

export default Notification;