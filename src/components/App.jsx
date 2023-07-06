import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import AppWrapper from './App.styled';
import Loader from './Loader/Loader';
import Message from './Message/Message';
import fetchImages from './utils/pixabay-api';
import Button from './Button/Button';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(1);
  const [perPage] = useState(12);
  const [showMore, setShowMore] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    if (!query || page === 0) {
      setStatus(STATUS.IDLE);
      return;
    }
    setStatus(STATUS.PENDING);
    fetchImages(query, page)
      .then(response => {
        setGalleryItems(prevGalleryItems => [
          ...(page === 1 ? [] : prevGalleryItems),
          ...response.data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return {
                id,
                webformatURL,
                largeImageURL,
                tags,
              };
            }
          ),
        ]);
        setTimeout(() => setStatus(STATUS.RESOLVED), 600);
        setShowMore(response.data.totalHits > perPage * page);
        setTotalHits(response.data.totalHits);
      })
      .catch(error => {
        setStatus(STATUS.REJECTED);
      });
  }, [query, page, perPage]);

  const reset = queryString => {
    setQuery(queryString);
    setPage(1);
    setGalleryItems([]);
    setShowMore(false);
  };

  const handleSubmit = values => {
    if (query !== values.query) {
      reset(values.query);
    }
  };

  const handleButtonClick = evt => setPage(prevPage => prevPage + 1);

  if (status === STATUS.PENDING) {
    return (
      <AppWrapper>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery galleryItems={galleryItems} />}
        {showMore && <Button onClick={handleButtonClick} />}
        <Loader />
      </AppWrapper>
    );
  }
  if (status === STATUS.RESOLVED) {
    return (
      <AppWrapper>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery galleryItems={galleryItems} />
        {totalHits === 0 && (
          <Message>{`No matches for "${query}". Try again.`}</Message>
        )}
        {showMore && <Button onClick={handleButtonClick} />}
      </AppWrapper>
    );
  }

  if (status === STATUS.REJECTED) {
    return (
      <AppWrapper>
        <Searchbar onSubmit={handleSubmit} />
        <Message>Internet connection error. Please, try later! </Message>
      </AppWrapper>
    );
  }

  // else STATUS.IDLE
  return (
    <AppWrapper>
      <Searchbar onSubmit={handleSubmit} />
      <Message>Please, input key words for search. </Message>
    </AppWrapper>
  );
};
