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
    child:[
      {
        key: 'examine',
        name: '审核论文',
      },
      {
        key: 'papers',
        name: '发表论文',
      },
      {
        key: 'salary',
        name: '调整工资',
      },
      {
        key: 'authors',
        name: '查看作者',
      },
      {
        key: 'journals',
        name: '查看期刊',
      },
    ]
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
    ],
  },
];
