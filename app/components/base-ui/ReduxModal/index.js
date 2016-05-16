import ReduxModal from './ReduxModal';
import ModalInstance from './ModalInstance';
import reducer from './reducer';
import { closeModal, showModal } from './actions';

export {
  ReduxModal as default,
  ModalInstance as Modal,
  reducer as modalReducer,
  closeModal,
  showModal,
};
