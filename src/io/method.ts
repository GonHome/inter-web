import { get, post, del, patch  } from '@billjs/request';

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

  private GET = async () => {
    return get(this.url);
  };

  private POST = async (params?: any) => {
    return post(this.url, params);
  };

  private DELETE = async () => {
    return del(this.url);
  };

  private PATCH = async (params?: any) => {
    return patch(this.url, params);
  };

  EXECUTE = (params?: any) => {
    switch (this.method) {
      case Method.GET:
        return this.GET();
      case Method.POST:
        return this.POST(params);
      case Method.DELETE:
        return this.DELETE();
      case Method.PATCH:
        return this.PATCH(params);
    }
  }
}
