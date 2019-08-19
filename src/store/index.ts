import { RouterStore } from 'mobx-react-router';
import User from './user';
import System from './system';
import App from './app';
import { RouteComponentProps } from 'react-router';
const routerStore =  new RouterStore();

export const rootStore = {
  app: new App(),
  system: new System(),
  user: new User(),
  router: routerStore,
};

export interface IUser extends RouteComponentProps<{}> {
  user: User;
}

export interface ISystem extends RouteComponentProps<{}> {
  system: System;
}

export interface IApp extends RouteComponentProps<{}> {
  app: App;
}

export { User, System, App }
