import { connect } from 'react-redux';
import { creators } from '../actions';
import { getEmail, getAuthError } from '../selectors';
import { showModal } from '../components/base-ui/ReduxModal';
import Login from '../components/Login';
import Signup from '../components/Signup';

const mapStateToProps = state => ({
  error: getAuthError(state),
  email: getEmail(state),
});

const actionProps = {
  login: creators.login,
  signup: creators.signup,
  goTo: showModal,
};

const LoginContainer = connect(mapStateToProps, actionProps)(Login);
const SignupContainer = connect(mapStateToProps, actionProps)(Signup);

export { LoginContainer, SignupContainer };
