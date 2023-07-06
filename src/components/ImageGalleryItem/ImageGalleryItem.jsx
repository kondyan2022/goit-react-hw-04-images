import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItems.styled';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [modal, setModal] = useState(false);

  const handleClick = evt => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      <GalleryItem>
        <GalleryItemImage src={webformatURL} alt={tags} onClick={handleClick} />
      </GalleryItem>
      {modal && (
        <Modal
          closeModal={handleCloseModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
export default ImageGalleryItem;
