import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import './_nav.scss';


const Nav = ({ isLoggedIn, user, links, logout, login, signup }) => {
  const navLinks = links.map(({ path, name, active }) => {
    const classes = classNames('nav__link', {
      'nav__link--is-active': active,
    });

    return (
      <Link className={classes} to={path} key={path}>{name}</Link>
    );
  });

  const loggedInNav = (
    <div>
      {user.name || user.email}
      {navLinks}
      <span className="nav__link u-pull-right" onClick={logout}>Log Out</span>
    </div>
  );

  const loggedOutNav = (
    <div>
      <span className="nav__link u-pull-right" onClick={login}>Log In</span>
      <span className="nav__link u-pull-right" onClick={signup}>Sign Up</span>
    </div>
  );

  return (
    <div className="nav">
      {isLoggedIn ? loggedInNav : loggedOutNav}
    </div>
  );
};

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  links: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Nav;
