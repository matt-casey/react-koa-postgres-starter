import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './_modal.scss';

const classes = classNames('modal__window', 'u-anim--fast');
const ModalWindow = ({ children = 'Hello World!', handleModalClick }) => (
  <div className={classes} onClick={handleModalClick}>
    {children}
  </div>
);

ModalWindow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  handleModalClick: PropTypes.func.isRequired,
};

export default ModalWindow;
