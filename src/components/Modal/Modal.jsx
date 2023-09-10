import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal_styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = (onModalClick, largeImage, alt) => {
    useEffect(() => {

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
     onModalClick();
    }
  };
    
    window.addEventListener('keydown', handleKeyDown);

        
    return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onModalClick])

  const onBackDropClose = evt => {
    if (evt.target === evt.currentTarget) {
      onModalClick();
    }
  };

    return createPortal(
      <Overlay onClick={onBackDropClose}>
        <ModalWindow>
          <img src={largeImage} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }

