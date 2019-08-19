import React from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {
  Switch ,
  Router,
  Route,
} from 'react-router';
import Head from 'components/head';
import SideMenu from 'components/left';
import Middle from 'components/middle';
import Main from 'components/main';
import { rootStore } from './store';
import './index.scss';
import Login from 'components/login';
import InJect from './util/InJect';
import { System, User } from './store';
const browserHistory = createBrowserHistory();
const routerStore =  new RouterStore();
// 同步路由与mobx的数据状态
const history = syncHistoryWithStore(browserHistory, routerStore);

interface IProps {
  system: System,
  user: User,
}

@inject("system", "user")
@observer
class Entry extends React.Component<IProps> {

  componentDidMount(): void {
    this.props.user.checkLogin();
    window.onresize = () => this.props.system.resize();
  }

  render() {
    const { height, width } = this.props.system;
    const { isLogin } = this.props.user;
    if (isLogin) {
      return (
        <div style={{ height, width }}>
          <Head />
          <InJect Component={SideMenu}/>
          <InJect Component={Middle}/>
          <InJect Component={Main} />
        </div>
      );
    } else {
      return (
        <div style={{ height, width }}>
          <InJect Component={Login} />
        </div>
      );
    }
  }
}

@observer
class App extends  React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider {...rootStore}>
          <Router history={history}>
            <Switch>
              <Route component={Entry}/>
            </Switch>
          </Router>
        </Provider>
      </ConfigProvider>
    )
  }
}

export default App;
