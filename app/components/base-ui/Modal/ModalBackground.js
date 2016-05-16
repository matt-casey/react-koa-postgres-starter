import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './_modal.scss';

const classes = classNames('modal__background', 'u-anim--fast');
const ModalBackground = ({ children, handleBackgroundClick }) => (
  <div className={classes} onClick={handleBackgroundClick}>
    {children}
  </div>
);

ModalBackground.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  handleBackgroundClick: PropTypes.func.isRequired,
};

export default ModalBackground;
