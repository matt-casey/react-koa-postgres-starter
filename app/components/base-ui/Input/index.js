import React from 'react';
import classNames from 'classnames';
import './_input.scss';

const Input = ({ name, label, value, error, type, onChange }) => {
  const containerClasses = classNames('input-container', { 'input--has-error': error });
  const inputClasses = classNames('input');
  const labelClasses = classNames('input__label');
  const errorClasses = classNames('input__error');
  const inputProps = { id: name, type, name, onChange, value };

  return (
    <div className={containerClasses}>
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      <input className={inputClasses} {...inputProps} />
      <span className={errorClasses}>
        {error}&nbsp;
      </span>
    </div>
	);
};

const htmlInputTypes = [
  'color', 'date', 'datetime', 'datetime-local', 'email', 'month',
  'number', 'range', 'search', 'tel', 'time', 'url', 'week', 'password',
];

Input.propTypes = {
  type: React.PropTypes.oneOf(htmlInputTypes),
  size: React.PropTypes.oneOf(['small', 'large']),
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  error: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
