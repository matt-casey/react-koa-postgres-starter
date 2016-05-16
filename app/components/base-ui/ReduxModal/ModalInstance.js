import { PropTypes } from 'react';

const ModalInstance = () => null;

ModalInstance.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.func,
  closeOnClickOut: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
};

export default ModalInstance;
