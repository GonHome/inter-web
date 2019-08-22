import { Method } from './method';

const mock = false;
export const io = {
    login: {
      mock,
      mockUrl: '',
      url: '/api/user/login/',
      method: Method.POST,
    },
    searchUser: {
      mock,
      mockUrl: '',
      url: '/api/user/search/',
      method: Method.GET,
    }
};
