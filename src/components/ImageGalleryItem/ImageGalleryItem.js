import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, info, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };
  return (
    <li className={css.imageGalleryItem}>
      <img
        onClick={toggleModal}
        className={css.imageGalleryItem_image}
        src={smallImage}
        alt={info}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={info} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
