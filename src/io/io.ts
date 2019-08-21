import { Method } from './method';

const mock = false;
export const io = {
    login: {
      mock,
      mockUrl: '',
      url: '/user/login/',
      method: Method.POST,
    }
};
