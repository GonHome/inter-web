import * as React from 'react';
import classNames from 'classnames';
import { Icon, IconName } from '@blueprintjs/core';
import { observer } from 'mobx-react';

interface IProps {
  code: string
  icon: IconName,
  text: string,
  count: number,
  active: boolean,
  checkTag: (checkedTag: string) => void,
}

@observer
export default class SideTag extends React.Component<IProps> {

  render() {
    const { code, text, icon, count, active, checkTag } = this.props;
    return (
      <div
        className={classNames("tag-item", { active })}
        onClick={() => checkTag(code)}
      >
        <Icon icon={icon}/>
        <span className="title" >{text}</span>
        <span className="counter">{count}</span>
      </div>
    );
  }
}
