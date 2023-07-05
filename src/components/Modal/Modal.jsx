import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalForm, ModalOverlay } from './Modal.styled';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const Modal = ({ largeImageURL, tags, updateLoader, closeModal }) => {
  const modalRoot = useRef(document.querySelector('#modal-root'));

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    disablePageScroll();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      enablePageScroll();
    };
  }, [closeModal]);

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };
  return createPortal(
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalForm>
        <img
          src={largeImageURL}
          alt={tags}
          onLoad={() => {
            updateLoader(-1);
          }}
          onError={() => {
            updateLoader(-1);
          }}
        />
      </ModalForm>
    </ModalOverlay>,
    modalRoot.current
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  updateLoader: PropTypes.func,
  closeModal: PropTypes.func,
};
