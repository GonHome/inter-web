import { IconName } from '@blueprintjs/icons';

export interface IOpenTag {
  text: string;
  code: string;
}

export interface sortObj {
  sortName: string,
  sortOrder: 'DESC' | 'ASC',
};

export interface sortOrderObj {
  text: string;
  icon: IconName;
  code: string;
};

export interface sortNameObj {
  text: string;
  code: string;
};
