import * as React from 'react';
import { System, App } from 'store';
import { Row, Col, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import MainHeadBar from './MainHeadBar';
import InJect from '../../util/InJect';

type ISystem = {
  system: System,
  app: App,
};

@inject("system", "app")
@observer
class Main extends React.Component<ISystem> {

  render() {
    const { system } = this.props;
    const { mainHeight, mainWidth } = system;
    return (
      <div className="main" style={{ width: mainWidth, height: mainHeight }}>
        <InJect Component={MainHeadBar} />
        <div className="main-body" style={{ height: mainHeight - 37 }}>
          <Row gutter={24}>
            <Col span={5}>
              接口名:
            </Col>
            <Col span={19}>
              <Input />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Main;
