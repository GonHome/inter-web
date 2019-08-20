import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('system')
@observer
export default class Head extends  React.Component {
  render() {
    return (
      <div className="head">
        <img src='logo.svg' alt='logo' />
        <div className="head-logo-text">
          <div className="title hover-link">
            <span>G</span>
            <span>S</span>
            <span>&nbsp;</span>
            <span>接</span>
            <span>口</span>
            <span>中</span>
            <span>心</span>
          </div>
          <div className="title hover-link">
            <span>G</span>
            <span>S</span>
            <span>&nbsp;</span>
            <span>接</span>
            <span>口</span>
            <span>中</span>
            <span>心</span>
          </div>
        </div>
      </div>
    )
  }
}

