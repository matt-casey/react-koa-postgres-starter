import React from 'react';
import { LoginContainer } from '../../containers/AuthContainer';

const LoginPage = () => (
  <div className="row row--centered">
    <div>Please Log In To Continue</div>
    <div className="col--1-1 col--1-2@small col--1-3@medium">
      <LoginContainer />
    </div>
  </div>
);

export default LoginPage;
