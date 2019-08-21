import { api, apiMock } from './api';
import { HalRestClient } from 'hal-rest-client';

export enum Method {
  GET, POST, DELETE, UPDATE,
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
  private client: HalRestClient;

  constructor (props: IApi) {
    this.mock = props.mock;
    this.url = props.mock ? props.mockUrl : props.url;
    this.method = props.method;
    this.client = props.mock ? apiMock : api ;
  }

  GET = async () => {
    return await this.client.fetchResource(this.url);
  };

  POST = async (params?: any) => {
    return await this.client.create(this.url, params);
  };

  DELETE = async () => {
    return await this.client.delete(this.url);
  };

  UPDATE = async (params?: any) => {
    return await this.client.update(this.url, params)
  };



}
