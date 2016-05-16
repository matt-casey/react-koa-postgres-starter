const API_ENDPOINT = 'http://localhost:8080/api/';
const API_ENDPOINT_TOKENS = 'tokens';
const API_ENDPOINT_USERS = 'users';
const API_DEFAULT_CONFIG = {
  method: 'GET',
  mode: 'cors',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
};

export const api = {
  config: API_DEFAULT_CONFIG,
  base: API_ENDPOINT,
  tokens: API_ENDPOINT_TOKENS,
  users: API_ENDPOINT_USERS,
};
