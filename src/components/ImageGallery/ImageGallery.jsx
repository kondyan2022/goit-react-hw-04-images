import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import PropTypes from 'prop-types';
import fetchImages from 'components/utils/pixabay-api';
import Button from 'components/Button/Button';
import Gallery from './ImageGallery.styled';
import Message from 'components/Message/Message';

class ImageGallery extends Component {
  state = {
    queryString: '',
    page: 0,
    totalHits: 1,
    per_page: 12,
    showMore: false,
    galleryItems: [],
  };

  reset() {
    this.setState({ queryString: this.props.query, page: 1, galleryItems: [] });
  }

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.reset();
      console.log('set new queryString');
      return;
    }
    if (
      this.state.page > prevState.page ||
      this.state.queryString !== prevState.queryString
    ) {
      const newPage =
        this.state.queryString === prevState.queryString ? this.state.page : 1;
      const prevGallery = newPage === 1 ? [] : prevState.galleryItems;

      this.props.updateLoader(1);
      fetchImages(this.state.queryString, newPage)
        .then(response => {
          this.setState({
            galleryItems: [
              ...prevGallery,
              ...response.data.hits.map(
                ({ id, webformatURL, largeImageURL, tags }) => {
                  this.props.updateLoader(1);
                  return {
                    id,
                    webformatURL,
                    largeImageURL,
                    tags,
                  };
                }
              ),
            ],
            showMore: response.data.totalHits > this.state.per_page * newPage,
            totalHits: response.data.totalHits,
            page: newPage,
          });
        })
        .catch(error => {
          this.props.updateError(true);
        })
        .finally(this.props.updateLoader(-1));
    }
  }

  handleButtonClick = evt =>
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

  render() {
    return (
      <>
        <Gallery>
          {this.state.galleryItems.map(
            ({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                imageClick={this.props.imageClick}
                updateLoader={this.props.updateLoader}
              />
            )
          )}
        </Gallery>
        {this.state.totalHits === 0 && (
          <Message>{`No matches for "${this.props.query}". Try again.`}</Message>
        )}
        {this.state.showMore && <Button onClick={this.handleButtonClick} />}
      </>
    );
  }
}

export default ImageGallery;
ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  imageClick: PropTypes.func,
  updateLoader: PropTypes.func,
  updateError: PropTypes.func,
};

// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
// import { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
// import fetchImages from 'components/utils/pixabay-api';
// import Button from 'components/Button/Button';
// import Gallery from './ImageGallery.styled';
// import Message from 'components/Message/Message';

// const ImageGallery = ({ query, imageClick, updateLoader, updateError }) => {
//   const [queryString, setQueryString] = useState(query);
//   const [page, setPage] = useState(1);
//   const [totalHits, setTotalHits] = useState(1);
//   const [per_page] = useState(12);
//   const [showMore, setShowMore] = useState(false);
//   const [galleryItems, setGalleryItems] = useState([]);

//   const firstCall = useRef(true);

//   useEffect(() => {
//     setPage(1);
//     setQueryString(query);
//     setGalleryItems([]);
//     console.log('New query', query);
//   }, [query]);

//   useEffect(() => {
//     const getImages = async () => {
//       try {
//         updateLoader(1);
//         const response = await fetchImages(queryString, page);
//         console.log('After fetch', queryString, page);
//         setGalleryItems(prevGalleryItems => [
//           ...(page === 1 ? [] : prevGalleryItems),
//           ...response.data.hits.map(
//             ({ id, webformatURL, largeImageURL, tags }) => {

//               return {
//                 id,
//                 webformatURL,
//                 largeImageURL,
//                 tags,
//               };
//             }
//           ),
//         ]);

//         setTotalHits(response.data.totalHits);
//         setShowMore(response.data.totalHits > per_page * page);
//       } catch (error) {
//         updateError(true);
//       } finally {
//         updateLoader(-1);
//       }
//     };

//     if (firstCall.current) {
//       firstCall.current = false;
//       return;
//     }

//     console.log('fetch', queryString, page);
//     getImages();
//   }, [page, queryString, per_page, updateError, updateLoader]);

//   const handleButtonClick = evt => setPage(prevPage => prevPage + 1);

//   return (
//     <>
//       <Gallery>
//         {galleryItems.map(({ id, webformatURL, largeImageURL, tags }) => ({      updateLoader(1)}
//           <ImageGalleryItem
//             key={id}
//             id={id}
//             webformatURL={webformatURL}
//             largeImageURL={largeImageURL}
//             tags={tags}
//             imageClick={imageClick}
//             updateLoader={updateLoader}
//           />
//         ))}
//       </Gallery>
//       {totalHits === 0 && (
//         <Message>{`No matches for "${query}". Try again.`}</Message>
//       )}
//       {showMore && <Button onClick={handleButtonClick} />}
//     </>
//   );
// };

// export default ImageGallery;
// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
//   imageClick: PropTypes.func,
//   updateError: PropTypes.func,
//   updateLoader: PropTypes.func,
// };
