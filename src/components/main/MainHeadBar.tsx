import * as React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';

type propTypes = {
};

@inject("system", "app")
@observer
class MainHeadBar extends React.Component<propTypes> {

  componentDidMount(): void {
    document.body.addEventListener('keydown', this.keydownEvent)
  }

  componentWillUnmount(): void {
    document.body.removeEventListener('keydown', this.keydownEvent);
  }

  keydownEvent = (e: any) => {
    // const { saveNotes } = this.props;
    if (window.event) {
      e = window.event;
    }
    const code = e.keyCode;
    if (e.ctrlKey && code === 83) {
      console.log('保存');
      // saveNotes();
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // changeEdit = () => {
  //   const { isEdit, changeIsEdit } = this.props;
  //   changeIsEdit(!isEdit);
  // };


  render() {
    return (
      <div className="layout-header toolbar">
        <ButtonGroup>
          <Button icon="edit" small title="编辑" />
          <Button icon="git-push" small title="保存" />
          <Button icon="trash" small title="删除" />
        </ButtonGroup>
      </div>
    );
  }
}

export default MainHeadBar;
