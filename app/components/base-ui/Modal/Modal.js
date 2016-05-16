import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './_modal.scss';
import addEventHandlers from './addEventHandlers';
import ModalWindow from './ModalWindow';
import ModalBackground from './ModalBackground';

const Modal = (props) => {
  const {
    wrapper: Wrapper,
    children,
    handleBackgroundClick,
    handleModalClick,
    isShowing,
    close,
  } = props;

  const classes = classNames(
    'modal',
    { 'is-showing': isShowing },
  );

  const content = Wrapper ? (<Wrapper close={close}>{children}</Wrapper>) : children;

  return (
    <div className={classes}>
      <ModalBackground handleBackgroundClick={handleBackgroundClick}>
        <ModalWindow handleModalClick={handleModalClick}>
          {content}
        </ModalWindow>
      </ModalBackground>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  handleBackgroundClick: PropTypes.func.isRequired,
  handleModalClick: PropTypes.func.isRequired,
  isShowing: PropTypes.bool.isRequired,
  wrapper: PropTypes.func,
  close: PropTypes.func,
};

export default addEventHandlers(Modal);
