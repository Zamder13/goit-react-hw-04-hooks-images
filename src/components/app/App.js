import React, { useState, useEffect } from 'react';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import fetchPhotos from '../API/API';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [photos, setPhotos] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const updateState = () => {
      setLoading(true);

      fetchPhotos(query, page)
        .then(data => {
          if (data.length === 0) {
            toast.info('Sorry, not found');

            return;
          }
          setPhotos(photos => [...photos, ...data]);
        })
        .then(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => setError(error))
        .finally(setLoading(false));
    };
    updateState();
  }, [page, query]);

  const onLoadMOre = () => {
    setPage(page => page + 1);
  };

  const formSubmit = query => {
    setQuery(query);
    setPage(1);
    setPhotos('');
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <SearchBar onSearch={formSubmit} />
      {photos && <ImageGallery images={photos} />}
      {loading && <Loader />}
      {photos.length > 0 && <Button click={onLoadMOre} />}
    </>
  );
};

export default App;
