import * as React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { Select } from 'antd';
import { inject, observer } from 'mobx-react';
import { languages } from "../../constants/appConstants";
import { System, App } from 'store';

const Option = Select.Option;

type IProps = {
  system: System,
  app: App,
};

@inject("system", "app")
@observer
class MainHeadBar extends React.Component<IProps> {

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
    const { language, changeLanguage } = this.props.app;
    return (
      <div className="layout-header toolbar">
        <ButtonGroup>
          <Button icon="git-push" small title="保存" />
          <Button icon="trash" small title="删除" />
        </ButtonGroup>
        <ButtonGroup>
          <Button icon="edit" small title="编辑" active />
          <Button icon="wrench" small title="调试" />
        </ButtonGroup>
        <ButtonGroup>
          <Select size="small" showSearch className='select-language' value={language} onSelect={changeLanguage}>
            {languages.map((language: string) => (
              <Option key={language} value={language}>{language}</Option>
              ))}
          </Select>
        </ButtonGroup>
      </div>
    );
  }
}

export default MainHeadBar;
