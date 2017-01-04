module.exports = [
  {
    key: 'dashboard',
    name: '仪表盘',
    icon: 'laptop'
  },
  {
    key: 'users',
    name: '用户管理',
    icon: 'user',
  },
  {
    key: 'ui',
    name: 'UI组件',
    icon: 'camera-o',
    clickable:false,
    child:[
      {
        key: 'ico',
        name: '业务图标',
      },
    ]
  },
  {
    key: 'search',
    name: '搜索',
    icon: 'search',
    child: [
      {
        key: 'paper',
        name: '论文搜索',
      },
      {
        key: 'author',
        name: '作者搜索',
      },
      {
        key: 'agency',
        name: '科研机构搜索',
      },
      {
        key: 'journal',
        name: '学术期刊搜索',
      },
      {
        key: 'publisher',
        name: '出版社搜索',
      },
      {
        key: 'navigation2',
        name: '二级导航2',
        child: [
          {
            key: 'navigation21',
            name: '三级导航1',
          },
          {
            key: 'navigation22',
            name: '三级导航2',
          },
        ],
      },
    ],
  },
];
