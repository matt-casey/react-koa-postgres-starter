import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeModal, showModal } from './actions';
import Modal from '../Modal';

function setupModal({ props: { name, component, closeOnClickOut, closeOnEscape } }) {
  this[name] = {
    component,
    closeOnClickOut,
    closeOnEscape,
  };
}

function setupModals(modals) {
  const output = {};
  React.Children.forEach(modals, setupModal, output);
  return output;
}

export default class ReduxModal extends React.Component {
  static propTypes = {
    // Modals
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    // From redux
    isShowing: PropTypes.bool.isRequired,
    modalName: PropTypes.string,
    modalProps: PropTypes.object,
    counter: PropTypes.number.isRequired,
    showModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    // From setup
    wrapper: PropTypes.func,
    closeOnClickOut: PropTypes.bool,
    closeOnEscape: PropTypes.bool,
  }

  static defaultProps = {
    closeOnClickOut: true,
    closeOnEscape: true,
  }

  constructor(props) {
    super(props);
    const modals = setupModals(props.children);
    this.state = {
      isShowing: false,
      modals,
      modalName: null,
      modalProps: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const isNewModal = this.props.counter !== nextProps.counter;
    const isShowing = this.props.isShowing;
    const willBeShowing = nextProps.isShowing;

    if (isNewModal && isShowing && willBeShowing) {
      this.closeThenOpen(nextProps);
    } else if (willBeShowing) {
      this.open(nextProps);
    } else {
      this.close();
    }
  }

  componentWillUnmount() {
    this.cancelAnimTimeout();
  }

  cancelAnimTimeout = () => {
    if (this.animationTimer) clearTimeout(this.animationTimer);
  }

  waitForAnimation = (fn, ...args) => {
    this.cancelAnimTimeout();
    this.animationTimer = setTimeout(fn.bind(this), 260, ...args);
  }

  open = props => {
    this.cancelAnimTimeout();
    const { modalName, modalProps } = props;
    this.setState({ isShowing: true, modalName, modalProps });
  }

  close = () => {
    this.setState({ isShowing: false });
    this.waitForAnimation(this.setState, { modalName: null });
  }

  closeThenOpen = props => {
    this.setState({ isShowing: false });
    this.waitForAnimation(this.open, props);
  }

  render() {
    const {
      isShowing,
      modals,
      modalName,
      modalProps,
    } = this.state;

    const {
      wrapper,
      closeModal: close,
      closeOnEscape: defaultCloseOnEscape,
      closeOnClickOut: defaultCloseOnClickOut,
    } = this.props;

    const modal = modals[modalName] || {};
    const closeOnEscape = modal.closeOnEscape !== undefined
      ? modal.closeOnEscape
      : defaultCloseOnEscape;
    const closeOnClickOut = modal.closeOnClickOut !== undefined
      ? modal.closeOnClickOut
      : defaultCloseOnClickOut;

    return (
      <Modal
        isShowing={isShowing}
        close={close}
        closeOnEscape={closeOnEscape}
        closeOnClickOut={closeOnClickOut}
        wrapper={wrapper}
      >
        {modal.component ? <modal.component closeModal={close} {...modalProps} /> : null}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const { isShowing, counter, name: modalName, props: modalProps } = state.modal;
  return { isShowing, counter, modalName, modalProps };
}

export default connect(mapStateToProps, { closeModal, showModal })(ReduxModal);
