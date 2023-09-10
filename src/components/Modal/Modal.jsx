import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal_styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = (onModalClick, largeImage, alt, onBackDropClose) => {
    useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
     onModalClick();
    }
  };

  const onBackDropClose = evt => {
    if (evt.target === evt.currentTarget) {
      onModalClick();
    }
  };
        
    return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onModalClick])

    return createPortal(
      <Overlay onClick={onBackDropClose}>
        <ModalWindow>
          <img src={largeImage} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }

