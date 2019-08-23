  import { get, post, del, patch  } from '@billjs/request';
  import { doError } from '../util/message';

export enum Method {
  GET, POST, DELETE, PATCH,
}

interface IApi {
  mock: boolean;
  mockUrl: string;
  url: string;
  method: Method;
}
export class ApiFetch {
  private mock: boolean;
  private url: string;
  private method: Method;

  constructor (props: IApi) {
    this.mock = props.mock;
    this.url = props.mock ? props.mockUrl : props.url;
    this.method = props.method;
  }

  private packUrl = (params: any) => {
    if (params && typeof params === 'string') {
      return `${this.url}?${params}`;
    } else {
      return this.url;
    }
  };

  private GET = async (params?: any) => {
    return await get(this.packUrl(params)).catch(e => {
      doError(e);
    });
  };

  private POST = async (params?: any) => {
    return await post(this.url, params).catch(e => {
      doError(e);
    });
  };

  private DELETE = async (params?: any) => {
    return await del(this.packUrl(params)).catch(e => {
      doError(e);
    });
  };

  private PATCH = async (params?: any) => {
    return await patch(this.url, params).catch(e => {
      doError(e);
    });
  };

  EXECUTE = (params?: any) => {
    switch (this.method) {
      case Method.GET:
        return this.GET(params);
      case Method.POST:
        return this.POST(params);
      case Method.DELETE:
        return this.DELETE(params);
      case Method.PATCH:
        return this.PATCH(params);
    }

  }
}
