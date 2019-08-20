import * as React from 'react';
import { System, App } from 'store';
import { Form } from 'antd';
import { inject, observer } from 'mobx-react';
import MainHeadBar from './MainHeadBar';
import InJect from '../../util/InJect';
import MainForm from './MainForm';

type ISystem = {
  system: System,
  app: App,
};

@inject("system", "app")
@observer
class Main extends React.Component<ISystem> {

  private formRef: any;
  render() {
    const { system } = this.props;
    const { mainHeight, mainWidth } = system;
    const WF = Form.create()(MainForm);
    return (
      <div className="main" style={{ width: mainWidth, height: mainHeight }}>
        <InJect Component={MainHeadBar} />
        <div className="main-body" style={{ height: mainHeight - 37 }}>
          <WF wrappedComponentRef={(inst: any) => { this.formRef = inst; } } />
        </div>
      </div>
    );
  }
}

export default Main;
