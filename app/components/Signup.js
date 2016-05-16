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

const Signup = ({ form, goTo, signup, error }) => {
  const { email, password } = form;
  const goToLogin = () => goTo('login');
  const submitSignup = e => {
    e.preventDefault();
    signup(email.value, password.value);
  };

  return (
    <div className="col--1-1">
      <form className="auth-form" onSubmit={submitSignup}>
        <div className="col--1-1">
          <Input {...email} />
        </div>
        <div className="col--1-1">
          <Input {...password} />
        </div>
        <div className="col--1-1">
          <div>{error}</div>
          <Button>Sign Up</Button>
        </div>
      </form>
      <Button onClick={goToLogin} variety="secondary">Already have an account?</Button>
    </div>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  error: PropTypes.string,
  form: PropTypes.object.isRequired,
};

export default addFormEvents(Signup, formSetup);
