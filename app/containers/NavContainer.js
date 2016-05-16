import { connect } from 'react-redux';
import { showModal } from '../components/base-ui/ReduxModal';
import { getLoggedIn, getUser } from '../selectors';
import { creators } from '../actions';
import Nav from '../components/Nav';

const links = [
  { path: '/app', name: 'home' },
  { path: '/app/settings', name: 'settings' },
];

const markActiveLink = (linkList, currentPath) =>
  linkList.map(link => (link.path === currentPath ? { ...link, active: true } : link));

const mapStateToProps = (state, ownProps) => {
  const currentPath = ownProps.location.pathname;

  return {
    links: markActiveLink(links, currentPath),
    isLoggedIn: getLoggedIn(state),
    user: getUser(state),
  };
};

const actionProps = {
  logout: creators.logout,
  login: () => showModal('login'),
  signup: () => showModal('signup'),
};

export default connect(mapStateToProps, actionProps)(Nav);
