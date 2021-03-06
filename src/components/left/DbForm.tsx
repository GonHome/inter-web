import * as React from 'react';
import { System, App } from 'store';
import { Input, Form, Select } from 'antd';
import { inject, observer } from 'mobx-react';

const { TextArea } = Input;
const Option = Select.Option;

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
class DbForm extends React.Component<IProps> {

  render() {
    const { form } = this.props;
    const { getFieldDecorator }  = form;
    return (
      <Form>
        <Form.Item
          className="item"
          {...formItemLayout}
          label='数据源类型'
        >
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '请选择数据源类型',
              }
            ]
          })(<Select size="small">
            <Option value='ES'>ES</Option>
            <Option value='DB'>DB</Option>
          </Select>)
          }
        </Form.Item>
        <Form.Item
          className="item"
          {...formItemLayout}
          label='连接名'
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请填写连接名',
              }
            ]
          })(<Input size="small"/>)
          }
        </Form.Item>
        <Form.Item
          className="item"
          {...formItemLayout}
          label='url'
        >
          {getFieldDecorator('url', {
            rules: [
              {
                required: true,
                message: '请填写url',
              }
            ]
          })(
            <TextArea autosize={{ minRows: 5 }}/>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default DbForm;
