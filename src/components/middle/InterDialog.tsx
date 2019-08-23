import * as React from 'react';
import { System, App } from 'store';
import { Form, Modal, Button, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import InterForm from './InterForm';
import { ValidateCallback } from 'antd/lib/form';

type IProps = {
  system: System,
  app: App,
  closeDialog: () => void;
  title: string;
  details?: any;
};

interface IState {
  loading: boolean;
}


@inject("system", "app")
@observer
class InterDialog extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { loading: false };
  }
  componentDidMount(): void {

  }

  private formRef: any;

  private wf: any;

  submit = () => {
    const { closeDialog } = this.props;
    const { addInter } = this.props.app;
    this.formRef.props.form.validateFields((err: ValidateCallback<any>) => {
      if (!err) {
        const inter = this.formRef.props.form.getFieldsValue();
        addInter(inter);
        closeDialog();
      }
    });
  };

  render() {
    const { system, closeDialog, title } = this.props;
    const { loading } = this.state;
    const { height } = system;
    let WF = null;
    if (this.wf) {
      WF = this.wf;
    } else {
      WF = Form.create()(InterForm);
      this.wf = WF;
    }
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
          <Button key="submit" type="primary" onClick={this.submit}>
            提交
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          <WF wrappedComponentRef={(inst: any) => { this.formRef = inst; } } />
        </Spin>
      </Modal>
    );
  }
}

export default InterDialog;
