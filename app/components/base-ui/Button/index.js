import React from 'react';
import classNames from 'classnames';
import './_button.scss';

const Button = ({ variety, children, size, loading, onClick, ...otherProps }) => {
  const classes = classNames('button', {
    'button--is-loading': loading,
    [`button--${variety}`]: true,
    [`button--${size}`]: size,
  });

  return (
    <button {...otherProps} className={classes} onClick={onClick}>{children}</button>
	);
};

Button.propTypes = {
  variety: React.PropTypes.oneOf(['primary', 'secondary']),
  size: React.PropTypes.oneOf(['small', 'large']),
  loading: React.PropTypes.bool,
  children: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

Button.defaultProps = {
  variety: 'primary',
};

export default Button;
