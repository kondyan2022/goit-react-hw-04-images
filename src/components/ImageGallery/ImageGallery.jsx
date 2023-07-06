import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import Gallery from './ImageGallery.styled';

const ImageGallery = ({ galleryItems }) => {
  return (
    <Gallery>
      {galleryItems.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  galleryItems: PropTypes.array,
};
export default ImageGallery;
