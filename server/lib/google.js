import Promise from 'bluebird';
import google from 'googleapis';
import * as C from '../config';

const scopes = [
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
];
const oAuthConfig = [
  C.GOOOGLE_APPS_CLIENT_ID,
  C.GOOOGLE_APPS_CLIENT_SECRET,
  `${C.API_ENDPOINT}/contacts`,
];
const oAuthPermissions = {
  access_type: 'offline',
  scope: scopes,
};
const peopleConfig = {
  resourceName: 'people/me',
  'requestMask.includeField': 'person.email_addresses,person.phone_numbers,person.names,person.birthdays', // eslint-disable-line
  // pageSize: 500,
};

const googlePeople = google.people('v1');
const googleOAuth2 = new google.auth.OAuth2(...oAuthConfig);
const googleAuthUrl = googleOAuth2.generateAuthUrl(oAuthPermissions);
const googleGetTokenAsync = Promise.promisify(googleOAuth2.getToken, { context: googleOAuth2 });
const googleListConnectionsAsync = Promise.promisify(googlePeople.people.connections.list);

const loopThroughPages = async (resource, config) => {
  let results = [];
  let nextPageToken;
  const NO_MORE_PAGES = 'NO_MORE_PAGES';

  while (nextPageToken !== NO_MORE_PAGES) {
    const newResults = await resource({ ...config, pageToken: nextPageToken });
    results = [...results, newResults];
    nextPageToken = newResults.nextPageToken ? newResults.nextPageToken : NO_MORE_PAGES;
  }

  return results;
};

const getConnections = ({ access_token, refresh_token }) => {
  // only one of the two token types is needed
  googleOAuth2.setCredentials({ access_token, refresh_token });
  return loopThroughPages(googleListConnectionsAsync, { ...peopleConfig, auth: googleOAuth2 });
};

export default {
  authUrl: googleAuthUrl,
  getTokens: googleGetTokenAsync,
  getConnections,
};
