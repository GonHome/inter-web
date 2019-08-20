import * as React from 'react';
import { System, App } from 'store';
import { Row, Col, Input, Form, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import EditSql from './EditSql';
import EditJson from './EditJson';
import InJect from '../../util/InJect';

interface ISystem {
  form: any;
  system: System,
  app: App,
}

interface IState {
  params: { name: string, type: string }[];
  expression: string;
}


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

@inject("system", "app")
@observer
class MainForm extends React.Component<ISystem, IState> {

  constructor(props: ISystem) {
    super(props);
    this.state = { params: [{ name: '', type: '' }], expression: '' };
  }

  addParams = () => {
    const { params } = this.state;
    params.push({ name: '', type: '' });
    this.setState({ params });
  };

  nameChange = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const { params } = this.state;
    params[index].name = e.currentTarget.value;
    this.setState({ params });
  };

  typeChange = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const { params } = this.state;
    params[index].type = e.currentTarget.value;
    this.setState({ params });
  };

  closeParams = (index: number) => {
    const { params } = this.state;
    params.splice(index,1);
    this.setState({ params });
  };

  expressionChange = (expression: string) => {
    this.setState({ expression });
  };

  render() {
    const { form } = this.props;
    const { params, expression } = this.state;
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
                message: '请填写接口名',
              }
            ]
          })(<Input />)
          }
        </Form.Item>
        <Form.Item
          className="item"
          {...formItemLayout}
          label='参数'
        >
          {getFieldDecorator('params', {})(
            <div>
              {params.map((param: {name: string, type: string}, index: number) => (
              <Row gutter={12} key={index}>
                <Col span={10}>
                  <Input value={param.name} onChange={ e => this.nameChange(e, index)}/>
                </Col>
                <Col span={10}>
                  <Input value={param.type} onChange={ e => this.typeChange(e, index)}/>
                </Col>
                <Col span={4}>
                  {index ===0 ?
                    <Button icon='plus' onClick={this.addParams}  />
                    :
                    <Button icon='close' onClick={() => this.closeParams(index)} /> }
                </Col>
              </Row>
              ))}
            </div>
          )}
        </Form.Item>
        <Form.Item
          className="item"
          {...formItemLayout}
          label='body'
        >
          {getFieldDecorator('expression', {})(
            <InJect Component={EditSql} props={ {expression, params, expressionChange: this.expressionChange }} />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default MainForm;
