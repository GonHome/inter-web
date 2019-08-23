import { Method } from './method';

const mock = true;
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
    },
    searchDb: {
      mock,
      mockUrl: '/mockApi/db/list',
      url: '',
      method: Method.GET,
    },
    searchMethodByDb: {
      mock,
      mockUrl: '/mockApi/inters/listByDb',
      url: '',
      method: Method.GET,
    },
    testConnect: {
      mock,
      mockUrl: '/mockApi/db/testConnect',
      url: '',
      method: Method.POST,
    },
    addDb: {
      mock,
      mockUrl: '/mockApi/db/add',
      url: '',
      method: Method.POST,
    },
    addInter: {
      mock,
      mockUrl: '/mockApi/inters/add',
      url: '',
      method: Method.POST,
    }
};
