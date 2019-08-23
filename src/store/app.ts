import { action, observable, runInAction } from 'mobx';
import { IOpenTag, sortObj } from '../models';
import { doErrMessage, doSucMessage } from '../util/notice';
import ioApp from 'io/ioConfig';

// app状态
class App {
  @observable loading: boolean;
  @observable dbs: any[];
  @observable inters: any[];
  @observable tags: IOpenTag[];
  @observable checkedTag: string;
  @observable checkedInter: string;
  @observable id: string;
  @observable sort: sortObj;
  @observable searchValue: string;
  @observable language: string;

  constructor () {
    this.loading = false;
    this.inters = [];
    this.dbs = [];
    this.tags = [];
    this.checkedTag = '';
    this.checkedInter = '';
    this.id = '';
    this.sort = { sortName: 'name', sortOrder: 'DESC' };
    this.searchValue = '';
    this.language = 'sql';
  }

  @action init = async () => {
    this.loading = true;
    const dbs = await ioApp.searchDb();
    let inters: any[] = [];
    if (dbs && dbs.length > 0) {
      inters = await ioApp.searchMethodByDb(
        `id=${dbs[0].id}&sortName=${this.sort.sortName}&sortOrder=${this.sort.sortOrder}&name=${this.searchValue}`
      );
    }
    runInAction(() => {
      this.loading = false;
      this.dbs = dbs;
      this.inters = inters;
      if (dbs && dbs.length > 0) {
        this.checkedTag = dbs[0].id;
      }
      if (inters && inters.length > 0) {
        this.checkedInter = inters[0].id;
      }
    });
  };

  @action changeLanguage = (language: string) => {
    this.language = language;
  };

  @action testConnect = async (db: any) => {
    const response = await ioApp.testConnect(db);
    const { success } = response;
    if (success) {
      doSucMessage('连接成功');
    } else {
      doErrMessage('连接失败');
    }
  };

  @action addDb = async (db: any) => {
    this.loading = true;
    const response = await ioApp.addDb(db);
    if (response) {
      this.dbs = await ioApp.searchDb();
      doSucMessage('添加数据源成功');
    }
    this.loading = false;
  };

  @action addInter = async (db: any) => {
    this.loading = true;
    const response = await ioApp.addInter(db);
    if (response) {
      this.inters = await ioApp.searchMethodByDb(
        `id=${ this.checkedTag }&sortName=${ this.sort.sortName }&sortOrder=${ this.sort.sortOrder }&name=${ this.searchValue }`
      );
      doSucMessage('添加接口成功');
    }
    this.loading = false;
  };

  @action searchInter = async () => {
    this.loading = true;
    this.inters = await ioApp.searchMethodByDb(
      `id=${ this.checkedTag }&sortName=${ this.sort.sortName }&sortOrder=${ this.sort.sortOrder }&name=${ this.searchValue }`
    );
    this.loading = false;
  };

  @action addTag = (tag:IOpenTag) => {
    if (tag.code !== 'home') {
      const isExist = this.tags.some((item: IOpenTag) => item.code === tag.code);
      if (!isExist) {
        this.tags.push(tag);
      }
    }
    this.checkTag(tag.code);
  };

  @action checkTag = (checkedTag: string) => {
    this.checkedTag = checkedTag;
  };

  @action checkInter = (checkedInter:string) => {
    this.checkedInter = checkedInter;
  };

  @action cancelTag = (tagCode: string) => {
    let index = -1;
    this.tags = this.tags.filter((tag: IOpenTag, ind: number) => {
      if (tag.code === tagCode) {
        index = ind;
      }
      return tag.code !== tagCode;
    });
    const isExist = this.tags.some((tag: IOpenTag) => tag.code === this.checkedTag);
    if (!isExist) {
      if (this.tags[index]) {
        this.checkTag(this.tags[index].code);
      } else if (this.tags[index - 1]) {
        this.checkTag(this.tags[index - 1].code);
      } else {
        this.checkTag('home');
      }
    }
  };

  @action closeOtherTags = (tagCode: string) => {
    this.tags = this.tags.filter((tag: IOpenTag) => {
      return tag.code === tagCode;
    });
    this.checkTag(tagCode);
  };

  @action closeRightTags = (tagCode: string) => {
    const tagCodes: string[] = this.tags.map((tag: IOpenTag) => tag.code);
    const index: number = tagCodes.indexOf(tagCode);
    this.tags  = this.tags.filter((tag: IOpenTag, ind: number) => ind <= index);
    const isExist = this.tags.some((tag: IOpenTag) => tag.code === this.checkedTag);
    if (!isExist) {
      this.checkTag(tagCode);
    }
  };

  @action changeSort = (sort: sortObj) => {
    this.sort = sort;
  };

  @action changeSearchValue = (searchValue: string) => {
    this.searchValue = searchValue;
  }
}

export default App;
