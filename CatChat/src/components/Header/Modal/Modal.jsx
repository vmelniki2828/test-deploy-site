import React from 'react';
import { Backdrop, CloseButton, Content } from './Modal.styled';

const Modal = ({ show, children }) => {
  // Не рендерим модальное окно, если свойство show=false
  if (!show) {
    return null;
  }

  return (
    <Backdrop>
      <Content>
        {children}
      </Content>
    </Backdrop>
  );
};

export default Modal;