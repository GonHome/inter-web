import * as React from 'react';
import { System, App } from 'store';
import { Form, Modal, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import DbForm from './DbForm';

type ISystem = {
  system: System,
  app: App,
  closeDialog: () => void;
  title: string;
  details?: any;
};

@inject("system", "app")
@observer
class DbDialog extends React.Component<ISystem> {

  private formRef: any;
  render() {
    const { system, closeDialog, title } = this.props;
    const { height } = system;
    const WF = Form.create()(DbForm);
    return (
      <Modal
        title={title}
        visible
        maskClosable={false}
        onCancel={closeDialog}
        bodyStyle={{ maxHeight: height - 250, overflowY: 'auto' }}
        footer={[
          <Button key="back" onClick={closeDialog}>
            取消
          </Button>,
          <Button key="back" onClick={closeDialog}>
            检测
          </Button>,
          <Button key="submit" type="primary" onClick={closeDialog}>
            提交
          </Button>,
        ]}
      >
        <WF wrappedComponentRef={(inst: any) => { this.formRef = inst; } } />
      </Modal>
    );
  }
}

export default DbDialog;
