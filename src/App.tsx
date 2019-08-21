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
import { api } from 'io/api';
import { io } from 'io/io';
import { ApiFetch } from "./io/method";
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

  async componentDidMount(): Promise<void> {
    this.props.user.checkLogin();
    window.onresize = () => this.props.system.resize();
    const response  = new ApiFetch(io.login).POST({ name: 'root1', password: '123456' });
    console.log(response);
  }

  mouseDownMoveMiddle = (e: any) => {
    let bx = e.clientX;
    let prevX = 0;
    document.onmousemove = (event) => {
      const { middleWidth, moveMiddleWidth } = this.props.system;
      let nextX = event.clientX - bx;
      let newMiddleWidth = middleWidth + nextX - prevX;
      moveMiddleWidth(newMiddleWidth);
      prevX = nextX;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
    };
    e.stopPropagation();
  };

  mouseDownMoveLeft = (e: any) => {
    let bx = e.clientX;
    let prevX = 0;
    document.onmousemove = (event) => {
      const { leftWidth, moveMiddleLeft } = this.props.system;
      let nextX = event.clientX - bx;
      let newLeftWidth = leftWidth + nextX - prevX;
      moveMiddleLeft(newLeftWidth);
      prevX = nextX;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
    };
    e.stopPropagation();
  };

  mouseUpMoveMiddle = () => {
    document.onmousemove = null;
  };

  mouseUpMoveSide = () => {
    document.onmousemove = null;
  };

  render() {
    const { height, width, leftWidth, middleWidth, headHeight } = this.props.system;
    const { isLogin } = this.props.user;
    if (isLogin) {
      return (
        <div style={{ height, width }}>
          <Head />
          <div
            className="sash"
            style={{ transform: `matrix(1, 0, 0, 1, ${leftWidth + middleWidth}, 0)`, top: headHeight }}
            onMouseDown={this.mouseDownMoveMiddle}
            onMouseUp={this.mouseUpMoveMiddle}
          />
          <div
            className="sash"
            style={{ transform: `matrix(1, 0, 0, 1, ${leftWidth}, 0)`, top: headHeight }}
            onMouseDown={this.mouseDownMoveLeft}
            onMouseUp={this.mouseUpMoveSide}
          />
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
