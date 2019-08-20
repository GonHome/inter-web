import * as React from 'react';
import { InputGroup, Button, Popover, Position, ContextMenu, Menu, MenuItem } from '@blueprintjs/core';
import { System, App } from 'store';
import SortMenu from './SortMenu';
import { sortObj, sortOrderObj, sortNameObj } from 'models';
import { sortOrders, sortNames } from 'constants/appConstants';
import { inject, observer } from "mobx-react";

type ISystem = {
  system: System,
  app: App,
};

@inject("system", "app")
@observer
class Middle extends React.Component<ISystem> {

  searchButton = () => {
    return <Button
      icon="search"
      minimal
    />
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

  // 单选和多选
  // check = (code :string) => {
  //   const { checkNotes, changeCheckNotes } = _.cloneDeep(this.props);
  //   const event: any = window.event;
  //   if (event.ctrlKey) {
  //     if (checkNotes.indexOf(code) >  -1) {
  //       const newCheckNotes =  checkNotes.filter((note: string) => {
  //         return note !== code;
  //       });
  //       changeCheckNotes(newCheckNotes);
  //     } else {
  //       checkNotes.push(code);
  //       changeCheckNotes(checkNotes);
  //     }
  //   } else {
  //     changeCheckNotes([code]);
  //   }
  // };

  showContextMenu = (e: any, note: any) => {
    const menu =
      <Menu>
        <MenuItem text={note.isPin ? '取消置顶' : '置顶'} />
        <MenuItem text={note.isFavourite ? '取消关注' : '关注'} />
        <MenuItem text={note.isDelete ? '还原' : '删除'} />
        <MenuItem text="永久删除" />
      </Menu>;
    if(e.button === 2) {
      ContextMenu.show(
        menu, { left: e.clientX, top: e.clientY },
      );
      e.preventDefault();
      e.stopPropagation();
    }
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
    // const { searchNotes } = this.props;
    if (window.event) {
      e = window.event;
    }
    const code = e.keyCode;
    if (code === 13) {
      // searchNotes();
    }
  };

  showTags = (tags: any[]) => {
    return tags.map((tag: any) => {
      console.log(tag.name);
      return tag.name;
    }).join('\n');
  };

  render() {
    const { app, system } = this.props;
    const { mainHeight, middleWidth } = system;
    const { sort, changeSort } = app;
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
            <Button icon="plus" small title="添加" />
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
          {/*{notes.map((note: any) => {*/}
          {/*  return <div*/}
          {/*    key={note.id}*/}
          {/*    className={classNames("note-item", { active: checkNotes.indexOf(note.id) > -1 })}*/}
          {/*    onClick={() => this.check(note.id)}*/}
          {/*    onContextMenu={(e) => this.showContextMenu(e, note)}*/}
          {/*  >*/}
          {/*    <span title={note.name} className="note-name">{note.name}</span>*/}
          {/*    <span className="icon-item">*/}
          {/*      {note.isFavourite ? <Icon icon="star" title="已关注" iconSize={14}/> : null}*/}
          {/*      {note.isPin ? <Icon icon="pin" title="已置顶" iconSize={14}/> : null}*/}
          {/*      {note.tags.length > 0 ? <Icon icon="tag" title={this.showTags(note.tags)} iconSize={14}/> : null}*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*})}*/}
        </div>
      </div>
    );
  }
}

export default Middle;
