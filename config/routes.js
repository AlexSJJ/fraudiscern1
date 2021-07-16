export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'register',
            path: '/user/register',
            component: './user/Register',
          },
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },

        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/test',
    name: 'test',
    icon: 'dashboard',
    routes: [{
      path: '/test/page1',
      name: 'page1',
      component: './Test/Page1',
    },{
      path: '/test/page2',
      name: 'page2',
      component: './Test/Page2',
    },{
      path: '/test/page3',
      name: 'page3',
      component: './Test/Page3',
    },
      {
        path: '/test/page4',
        name: 'page4',
        component: './Test/Page4',
      }],

  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
