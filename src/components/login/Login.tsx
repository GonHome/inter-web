import React from 'react';
import { inject, observer } from 'mobx-react';
import { ISystem } from 'store';

@inject('system')
@observer
export default class Login extends  React.Component<ISystem> {
  render() {
    return (
      <div className="login">
        <div className="login-section">
          <img alt="login-title" src="login_title.png" className="login-title" />
          <dl className="login-warp">
            <h1>欢迎登录</h1>
            <dt className="core-radius">
              <img alt="username" src="login_username_ico.png" />
              <p><input type="text" placeholder="请输入用户名"/></p>
            </dt>
            <dt className="core-radius">
              <img alt="password" src="login_password_ico.png"/>
              <p><input type="password" placeholder="请输入密码"/></p>
            </dt>
            <dt>
              <a className="name-btn core-radius">用户名登录</a>
            </dt>
          </dl>
        </div>
      </div>
    );
  }
}

