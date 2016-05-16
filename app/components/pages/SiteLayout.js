import React from 'react';
import NavContainer from '../../containers/NavContainer';
import Modals from '../Modals';

const SiteLayout = ({ children, location }) => (
  <div className="SiteLayout">
    <NavContainer location={location} />
    {children}
    <Modals />
  </div>
);

SiteLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
  location: React.PropTypes.object.isRequired, // passed from react-router-redux
};

export default SiteLayout;
