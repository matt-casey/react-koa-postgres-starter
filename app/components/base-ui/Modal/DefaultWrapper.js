import React from 'react';

const ModalWrapper = ({ close, children }) => (
  <div className="modal__wrapper">
    <div className="modal__close-button" onClick={close}>
      &times;
    </div>
    <div className="modal__content">
      {children}
    </div>
  </div>
);

ModalWrapper.propTypes = {
  close: React.PropTypes.func,
  children: React.PropTypes.any,
};

export default ModalWrapper;
