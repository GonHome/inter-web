import { createClient } from 'hal-rest-client';
import { checkError, doError } from 'util/message';

export const api = (() => {
  const apiHttp = createClient('/api', { withCredentials: true, responseType: 'application/Json' });
  apiHttp.addHeader('If-Modified-Since', '');
  apiHttp.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        let message = checkError(error);
        if (!message) {
          message = error.response.data;
        }
        doError(message);
      }
    },
  );
  return apiHttp;
})();

export const apiMock = (() => {
  const apiHttp = createClient('/mockApi', { withCredentials: true, responseType: 'application/Json' });
  apiHttp.addHeader('If-Modified-Since', '');
  apiHttp.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        let message = checkError(error);
        if (!message) {
          message = error.response.data;
        }
        doError(message);
      }
    },
  );
  return apiHttp;
})();
