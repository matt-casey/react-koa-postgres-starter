import { api } from '../constants/config';

const handleResponse = async response => {
  const isError = response.ok === false || response.status < 200 || response.status >= 300;
  let output;

  try {
    output = await response.json();
  } catch (e) {
    output = response;
  }

  if (isError) {
    const error = { status: response.status, message: output.message || response.statusText };
    throw error;
  }

  return output;
};

export const fetchApi = async (route, config) => {
  const url = api.base + route;
  const options = { ...api.config, ...config };

  if (options.body) {
    options.body = JSON.stringify(options.body);
    options.headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, options);
  return handleResponse(response);
};
