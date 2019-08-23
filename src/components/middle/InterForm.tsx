import * as React from 'react';
import { System, App } from 'store';
import { Input, Form } from 'antd';
import { inject, observer } from 'mobx-react';

const { TextArea } = Input;

interface IProps {
  form: any;
  system: System,
  app: App,
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@inject("system", "app")
@observer
class InterForm extends React.Component<IProps> {

  render() {
    const { form } = this.props;
    const { getFieldDecorator }  = form;
    return (
      <Form>
        <Form.Item
          className="item"
          {...formItemLayout}
          label='接口名'
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入接口名',
              }
            ]
          })(<Input size="small" />)
          }
        </Form.Item>
        <Form.Item
          className="item"
          {...formItemLayout}
          label='描述'
        >
          {getFieldDecorator('description', {})(
            <TextArea autosize={{ minRows: 5 }}/>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default InterForm;
