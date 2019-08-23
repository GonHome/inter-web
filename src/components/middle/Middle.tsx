import * as React from 'react';
import { InputGroup, Button, Popover, Position, Icon } from '@blueprintjs/core';
import { System, App } from 'store';
import SortMenu from './SortMenu';
import { sortObj, sortOrderObj, sortNameObj } from 'models';
import { sortOrders, sortNames } from 'constants/appConstants';
import { inject, observer } from "mobx-react";
import classNames from 'classnames';
import InJect from 'util/InJect';
import InterDialog from './InterDialog';

type IProps = {
  system: System,
  app: App,
};


interface IState {
  Dialog: any;
}

@inject("system", "app")
@observer
class Middle extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { Dialog: null };
  }

  searchButton = () => {
    const { searchInter } = this.props.app;
    return <Button
      icon="search"
      minimal
      onClick={searchInter}
    />
  };

  addInter = () => {
    this.setState({ Dialog: () => <InJect
        Component={InterDialog}
        props={{ closeDialog: this.closeDialog, title: '添加接口' }}
      />})
  };

  editInter = (e: any) => {
    this.setState({ Dialog: () => <InJect
        Component={InterDialog}
        props={{ closeDialog: this.closeDialog, title: '修改接口' }}
      />})
  };

  closeDialog = () => {
    this.setState({ Dialog: null });
  };

  changeSortOrder = () => {
    const { sort, changeSort } = this.props.app;
    const { sortOrder, sortName } = sort;
    let newSort: sortObj = sort;
    if (sortOrder === 'ASC') {
      newSort = { sortName, sortOrder: 'DESC' };
    } else {
      newSort = { sortName, sortOrder: 'ASC' };
    }
    changeSort(newSort);
  };

  showOrderIcon = () => {
    const { sort } = this.props.app;
    const { sortOrder } = sort;
    const checkItem = sortOrders.filter((item: sortOrderObj) => {
      return item.code === sortOrder;
    })[0];
    if (checkItem) {
      return <Button icon={checkItem.icon} small minimal title={checkItem.text} className="bp3-button-order" onClick={this.changeSortOrder}/>;
    }
    return null;
  };

  showSortName = () => {
    const { sort } = this.props.app;
    const { sortName } = sort;
    const checkItem = sortNames.filter((item: sortNameObj) => {
      return item.code === sortName;
    })[0];
    if (checkItem) {
      return checkItem.text;
    }
    return null;
  };

  focusSearch = () => {
    document.body.addEventListener('keyup', this.keyUpEvent);
  };

  blurSearch = () => {
    document.body.removeEventListener('keyup', this.keyUpEvent);
  };

  changeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { changeSearchValue } = this.props.app;
    changeSearchValue(e.currentTarget.value)
  };

  keyUpEvent = (e: any) => {
    const { searchInter } = this.props.app;
    if (window.event) {
      e = window.event;
    }
    const code = e.keyCode;
    if (code === 13) {
      searchInter();
    }
  };

  showTitle = (inter: any) => {
    return `接口名:${inter.name}\n描述:${inter.description}`;
  };

  render() {
    const { app, system } = this.props;
    const { Dialog } = this.state;
    const { mainHeight, middleWidth } = system;
    const { sort, changeSort, inters, checkInter, checkedInter } = app;
    return (
      <div className="middle" style={{ width: middleWidth }}>
        <div className="layout-header toolbar">
          <div className="multiple grow">
            <div className="search" style={{ width: middleWidth - 52 }}>
              <InputGroup
                placeholder="搜索..."
                rightElement={this.searchButton()}
                small
                type="text"
                onBlur={this.blurSearch}
                onChange={this.changeSearch}
                onFocus={this.focusSearch}
              />
            </div>
            <Button icon="plus" small title="添加" onClick={this.addInter}/>
          </div>
        </div>
        <div className="layout-header list-header">
          <Popover
            content={<SortMenu width={middleWidth - 52} sort={sort} changeSort={changeSort}/>}
            position={Position.BOTTOM_LEFT}
            modifiers={{ arrow: { enabled: false } }}>
            <div style={{ width: middleWidth - 52, display: 'inline-block', cursor: 'pointer' }}>
              {this.showSortName()}
            </div>
          </Popover>
          {this.showOrderIcon()}
        </div>
        <div className="list-notes" style={{ height: mainHeight - 65 }}>
          {inters.map((inter: any) => {
            return <div
              key={inter.id}
              className={classNames("note-item", { active: inter.id === checkedInter })}
              onClick={() => checkInter(inter.id)}
            >
              <span title={this.showTitle(inter)} className="note-name">{inter.name}</span>
              <Icon className='icon-item' icon='edit' title='编辑' onClick={e => this.editInter(e)}/>
            </div>
          })}
        </div>
        {Dialog ? <Dialog /> : null}
      </div>
    );
  }
}

export default Middle;
