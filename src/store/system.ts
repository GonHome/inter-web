import { observable, action, computed } from 'mobx';
import { MIDDLE_MAX_WIDTH, MIDDLE_MIN_WIDTH, LEFT_MAX_WIDTH, LEFT_MIN_WIDTH } from 'constants/commonConstants';
// 系统状态
class System {
  @observable width: number;
  @observable height: number;
  @observable leftWidth: number;
  @observable middleWidth: number;
  @observable headHeight: number;

  constructor () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.leftWidth = 250;
    this.middleWidth = 350;
    this.headHeight = 50;
  }

  @action resize () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  @action moveMiddleWidth = (middleWidth: number) => {
    if (middleWidth > MIDDLE_MAX_WIDTH) {
      this.middleWidth = MIDDLE_MAX_WIDTH;
    } else if (middleWidth < MIDDLE_MIN_WIDTH) {
      this.middleWidth = MIDDLE_MIN_WIDTH;
    } else {
      this.middleWidth = middleWidth;
    }
  };

  @action moveMiddleLeft = (leftWidth: number) => {
    if (leftWidth > LEFT_MAX_WIDTH) {
      this.leftWidth = LEFT_MAX_WIDTH;
    } else if (leftWidth < LEFT_MIN_WIDTH) {
      this.leftWidth = LEFT_MIN_WIDTH;
    } else {
      this.leftWidth = leftWidth;
    }
  };

  @computed
  get rightWidth(): number {
    return this.width - this.leftWidth;
  }

  @computed
  get mainHeight(): number {
    return this.height - this.headHeight;
  }

  @computed
  get mainWidth(): number {
    return this.width - this.leftWidth - this.middleWidth;
  }
}

export default System;
