import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItems.styled';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  imageClick,
  updateLoader,
}) => {
  const handleClick = evt => {
    updateLoader(1);
    imageClick({
      largeImageURL: largeImageURL,
      tags: tags,
    });
  };

  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={handleClick}
        onLoad={() => {
          updateLoader(-1);
        }}
        onError={() => {
          updateLoader(-1);
        }}
      />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  imageClick: PropTypes.func,
  updateLoader: PropTypes.func,
};
