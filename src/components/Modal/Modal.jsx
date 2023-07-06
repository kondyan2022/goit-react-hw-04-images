import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalForm, ModalOverlay } from './Modal.styled';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import Loader from 'components/Loader/Loader';

const Modal = ({ largeImageURL, tags, closeModal }) => {
  const [loading, setLoading] = useState(false);

  const modalRoot = useRef(document.querySelector('#modal-root'));

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    disablePageScroll();
    setLoading(true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      enablePageScroll();
      setLoading(false);
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
            setLoading(false);
          }}
          onError={() => {
            setLoading(false);
          }}
        />
      </ModalForm>
      {loading > 0 && <Loader />}
    </ModalOverlay>,
    modalRoot.current
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  closeModal: PropTypes.func,
};
