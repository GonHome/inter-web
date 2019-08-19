import React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';
import { System, App } from 'store';
import { SelectParam } from 'antd/lib/menu';
import { IOpenTag } from 'models';
import SideTag from './SideTag';
import { leftDemos } from 'constants/appConstants';

interface IProps {
  system: System,
  app: App,
}

@inject("system", "app")
@observer
export default class SideMenu extends  React.Component<IProps> {

  select = ({ item }: SelectParam) => {
    const { app } = this.props;
    const { addTag } = app;
    const { children, eventKey } = item.props;
    let param: IOpenTag;
    if (typeof children === 'string') {
      param = { code: eventKey, text: children };
    } else {
      param = { code: eventKey, text: children[1].props.children };
    }
    addTag(param);
  };

  render() {
    const { system, app } = this.props;
    const { checkedTag, checkTag } = app;
    const { leftWidth, mainHeight } = system;
    return (
      <div className="sideMenu" style={{ width: leftWidth, height: mainHeight }}>
        <ButtonGroup className="sideBar">
          <Button icon="plus" minimal small title="添加" />
          <Button icon="edit" minimal small title="修改" disabled={!checkedTag}/>
          <Button icon="trash" minimal small title="删除" disabled={!checkedTag}/>
        </ButtonGroup>
        <div className="side-items" style={{ height: mainHeight - 25 }}>
          {leftDemos.map((item: any) => (
            <SideTag
              code={item.code}
              icon={item.icon}
              text={item.text}
              count={item.count}
              active={checkedTag === item.code}
              checkTag={checkTag}
            />
          ))}
        </div>
      </div>
    );
  }
}

