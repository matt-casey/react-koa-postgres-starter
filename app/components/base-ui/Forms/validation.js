const maxLength = (value, max) => {
  if (value.length > max) throw new Error(`must be less than ${max} characters`);
};
const minLength = (value, min) => {
  if (value.length < min) throw new Error(`must be more than ${min} characters`);
};
const isValidEmail = value => {
  const pattern = new RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/);
  if (!pattern.test(value)) throw new Error(`must be a valid email`);
};

const validationRules = {
  email: value => {
    try {
      isValidEmail(value);
      return '';
    } catch (error) {
      return error.message;
    }
  },
  password: value => {
    try {
      minLength(value, 3);
      return '';
    } catch (error) {
      return error.message;
    }
  },
};

export default validationRules;
