import React from 'react';
import validationRules from './validation';

const nullFn = () => '';

const addFormEvents = (ComposedComponent, setup) => class Form extends React.Component {
  constructor(props) {
    super(props);
    const formFields = this.setupForm(setup);
    this.state = {
      ...formFields,
    };
  }

  createField = ({ name, validation, selectInital = nullFn, ...otherProps }) => ({
    name,
    value: selectInital(this.props),
    onChange: this.createUpdateFn(name),
    validation: validationRules[validation],
    error: null,
    ...otherProps,
  })

  setupForm = fields => {
    const state = {};
    fields.forEach(field => { state[field.name] = this.createField(field); });
    return state;
  };

  createUpdateFn = fieldName => event => this.updateField(fieldName, event)

  updateField = (fieldName, event) => {
    const { value } = event.target;
    const field = { ...this.state[fieldName] };

    if (field.validation) field.error = field.validation(value);
    field.value = value;

    this.setState({ [fieldName]: field });
  }

  render() {
    return (
      <ComposedComponent form={this.state} {...this.props} />
    );
  }
};

export default addFormEvents;
