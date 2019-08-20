import * as React from 'react';
import { System, App } from 'store';
import { Form, Modal } from 'antd';
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
        onOk={closeDialog}
        onCancel={closeDialog}
        bodyStyle={{ maxHeight: height - 250, overflowY: 'auto' }}
      >
        <WF wrappedComponentRef={(inst: any) => { this.formRef = inst; } } />
      </Modal>
    );
  }
}

export default DbDialog;
