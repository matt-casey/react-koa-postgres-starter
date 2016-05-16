import React, { PropTypes } from 'react';
import Button from './base-ui/Button';
import Input from './base-ui/Input';
import addFormEvents from './base-ui/Forms';

const formSetup = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    validation: 'email',
    selectInital: props => props.email,
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: 'password',
  },
];

const Login = ({ form, goTo, login, error }) => {
  const { email, password } = form;
  const goToSignup = () => goTo('signup');
  const submitLogin = e => {
    e.preventDefault();
    login(email.value, password.value);
  };

  return (
    <div className="col--1-1">
      <form className="auth-form" onSubmit={submitLogin}>
        <div className="col--1-1">
          <Input {...email} />
        </div>
        <div className="col--1-1">
          <Input {...password} />
        </div>
        <div className="col--1-1">
          <div>{error}</div>
          <Button>Log In</Button>
        </div>
      </form>
      <Button variety="secondary" onClick={goToSignup}>Create an account</Button>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  error: PropTypes.string,
  form: PropTypes.object.isRequired,
};

export default addFormEvents(Login, formSetup);
