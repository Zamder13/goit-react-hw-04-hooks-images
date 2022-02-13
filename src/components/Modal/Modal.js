import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useLifecycles } from 'react-use';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  useLifecycles(
    () => window.addEventListener(`keydown`, handleKeyDown),
    () => window.removeEventListener(`keydown`, handleKeyDown),
  );

  const handleKeyDown = evt => {
    if (evt.code === `Escape`) {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleButtonClick = () => {
    onClose();
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
      <button
        type="button"
        className={css.modalButton}
        onClick={handleButtonClick}
      >
        <IoClose size={32} />
      </button>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
