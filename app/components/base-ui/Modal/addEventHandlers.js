import React, { PropTypes } from 'react';

const ESCAPE_KEY_CODE = 27;
const addEventHandlers = ComposedComponent => class ModalEventHandler extends React.Component {
  static propTypes = {
    closeOnClickOut: PropTypes.bool,
    closeOnEscape: PropTypes.bool,
    close: PropTypes.func.isRequired,
    isShowing: PropTypes.bool,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscape, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape, false);
  }

  handleEscape = event => {
    const isShowing = this.props.isShowing;
    const isEscapeEvent = event.keyCode === ESCAPE_KEY_CODE;
    const {
      closeOnEscape: shouldHandle,
      close: closeModal,
    } = this.props;

    if (isShowing && isEscapeEvent && shouldHandle) {
      event.preventDefault();
      closeModal();
    }
  }

  handleClickOut = event => {
    const {
      closeOnClickOut: shouldHandle,
      close: closeModal,
    } = this.props;

    if (shouldHandle) {
      event.preventDefault();
      closeModal();
    }
  }

  stopPropogation = event => {
    event.stopPropagation();
  }

  render() {
    const {
      closeOnClickOut, // eslint-disable-line
      closeOnEscape, // eslint-disable-line
      ...otherProps, // eslint-disable-line
    } = this.props;

    return (
      <ComposedComponent
        handleBackgroundClick={this.handleClickOut}
        handleModalClick={this.stopPropogation}
        {...otherProps}
      />
    );
  }
};

export default addEventHandlers;
