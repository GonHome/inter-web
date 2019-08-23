import React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';
import { System, App } from 'store';
import { SelectParam } from 'antd/lib/menu';
import { IOpenTag } from 'models';
import SideTag from './SideTag';
import DbDialog from './DbDialog';
import InJect from 'util/InJect';
import { doErrMessage } from '../../util/notice';

interface IProps {
  system: System,
  app: App,
}

interface IState {
  Dialog: any;
}

@inject("system", "app")
@observer
export default class SideMenu extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { Dialog: null };
  }

  addDb = () => {
    this.setState({ Dialog: () => <InJect
        Component={DbDialog}
        props={{ closeDialog: this.closeDialog, title: '添加数据源' }}
      />})
  };

  editDb = () => {
    this.setState({ Dialog: () => <InJect
        Component={DbDialog}
        props={{ closeDialog: this.closeDialog, title: '修改数据源' }}
      />})
  };

  closeDialog = () => {
    this.setState({ Dialog: null });
  };

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

  delete = () => {
    doErrMessage('shabai');
  }

  render() {
    const { system, app } = this.props;
    const { Dialog } = this.state;
    const { checkedTag, checkTag, dbs } = app;
    const { leftWidth, mainHeight } = system;
    return (
      <div className="sideMenu" style={{ width: leftWidth, height: mainHeight }}>
        <ButtonGroup className="sideBar">
          <Button icon="plus" minimal small title="添加" onClick={this.addDb}/>
          <Button icon="edit" minimal small title="修改" disabled={!checkedTag} onClick={this.editDb}/>
          <Button icon="trash" minimal small title="删除" disabled={!checkedTag} onClick={this.delete}/>
        </ButtonGroup>
        <div className="side-items" style={{ height: mainHeight - 25 }}>
          {dbs.map((item: any) => (
            <SideTag
              key={item.id}
              code={item.id}
              icon='database'
              text={item.name}
              count={item.count}
              active={checkedTag === item.id}
              checkTag={checkTag}
            />
          ))}
        </div>
        {Dialog ? <Dialog /> : null}
      </div>
    );
  }
}

