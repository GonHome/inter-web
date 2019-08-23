import { sortOrderObj } from '../models';

export const sortOrders: sortOrderObj[] = [
  { code: 'DESC', text: '降序', icon: 'chevron-down' },
  { code: 'ASC', text: '升序', icon: 'chevron-up' },
];

export const sortNames = [
  { code: 'name', text: '标题' },
  { code: 'createTime', text: '创建时间' },
  { code: 'updateTime', text: '修改时间' },
];

export const languages = [
  'sql', 'json', 'markdown', 'php', 'html', 'redis', 'scss', 'css', 'xml', 'java',
];
