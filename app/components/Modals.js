import React from 'react';
import ReduxModal, { Modal } from './base-ui/ReduxModal';
import ModalWrapper from './base-ui/Modal/DefaultWrapper';
import { SignupContainer, LoginContainer } from '../containers/AuthContainer';

const Modals = () => (
  <ReduxModal wrapper={ModalWrapper}>
    <Modal name="login" component={LoginContainer} closeOnClickOut={false} />
    <Modal name="signup" component={SignupContainer} closeOnClickOut={false} />
  </ReduxModal>
);

export default Modals;
