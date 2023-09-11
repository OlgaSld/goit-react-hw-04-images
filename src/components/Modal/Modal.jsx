import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal_styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onModalClick, largeImage }) => {
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
          <img src={largeImage.largeImageURL} alt={largeImage.tags} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }


// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import { Overlay, ModalWindow } from './Modal_styled';

// const modalRoot = document.querySelector('#modal-root');

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = evt => {
//     if (evt.code === 'Escape') {
//       this.props.onModalClick();
//     }
//   };

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   onBackDropClose = evt => {
//     if (evt.target === evt.currentTarget) {
//       this.props.onModalClick();
//     }
//   };

//   render() {
//     const { largeImage, alt } = this.props;
//     return createPortal(
//       <Overlay onClick={this.onBackDropClose}>
//         <ModalWindow>
//           <img src={largeImage} alt={alt} />
//         </ModalWindow>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }