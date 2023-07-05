import { createPortal } from 'react-dom';
import { RotatingLines } from 'react-loader-spinner';
import LoaderOverlay from './Loader.styled';
import { useRef } from 'react';

const Loader = () => {
  const modalRoot = useRef(document.querySelector('#modal-root'));
  return createPortal(
    <LoaderOverlay>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="1.00"
        width="96"
        visible={true}
      />
    </LoaderOverlay>,
    modalRoot.current
  );
};

export default Loader;
