import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLoggedIn, getLoaded } from '../selectors';
import { creators } from '../actions';

class AppContainer extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    isLoaded: PropTypes.bool.isRequired,
  }

  render() {
    const { isLoaded, children, ...otherProps } = this.props;
    const childrenWithProps = React.Children.map(children,
      child => React.cloneElement(child, { ...otherProps }));

    return isLoaded ? (<div>{childrenWithProps}</div>) : (<div>Loading...</div>);
  }
}

const mapStateToProps = state => ({
  isLoggedIn: getLoggedIn(state),
  isLoaded: getLoaded(state),
});

const actionProps = {
  logout: creators.logout,
};

export default connect(mapStateToProps, actionProps)(AppContainer);
