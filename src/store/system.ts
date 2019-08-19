import { observable, action, computed } from 'mobx';

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
    this.middleWidth = 250;
    this.headHeight = 50;
  }

  @action resize () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }



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
