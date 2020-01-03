import Layout from 'src/pages/layout/layout';

// 不作为main组件子页面展示的页面单独写，如下
const loginRouter = {
  path: '/login',
  name: 'Login',
  alias: ['/index.html', '/index'],
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('src/pages/login/login.vue')
};

// 错误页面
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('src/pages/error/index')
};

// 作为main组件子页面展示  但不在左侧菜单显示的路由otherRoter里
export const otherRouter = {
  path: '',
  name: 'otherRouter',
  redirect: '/home',
  meta: {
    requireAuth: true
  },
  component: Layout,
  children: [
    {
      path: 'home',
      name: 'home',
      title: '首页',
      component: () => import('src/pages/home/home')
    }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/presell',
    name: 'presell',
    title: '发售预警',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'presell_index',
        title: '发售预警',
        component: () => import('src/pages/presell/index')
      }
    ]
  },
  {
    path: '/register',
    name: 'presell',
    title: 'sneaker登记',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'register_index',
        title: 'sneaker登记',
        component: () => import('src/pages/register/index')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    title: '用户管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user_index',
        title: '用户管理',
        component: () => import('src/pages/user/index')
      }
    ]
  },
  {
    path: '/access',
    name: 'access',
    title: '权限管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'access_index',
        title: '权限管理',
        component: () => import('src/pages/access/index')
      }
    ]
  },
  {
    path: '/sportsShoesCircle',
    name: 'category',
    title: '品类',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'demo/index',
        name: 'category',
        title: '一级页面（主页面）',
        component: () => import('src/pages/sportsShoesCircle/demo/index')
      },
      {
        path: 'brand',
        name: 'brand',
        title: '二级页面',
        component: () => import('src/pages/sportsShoesCircle/demo/brand') 
      },
      {
        path: 'product',
        name: 'product',
        title: '三级页面',
        component: () => import('src/pages/sportsShoesCircle/demo/product') 
      },
      {
        path: 'productDetail',
        name: 'productDetail',
        title: '四级页面',
        component: () => import('src/pages/sportsShoesCircle/demo/productDetail') 
      },
      {
        path: 'high/mostHighTen',
        name: 'mostHighTen',
        title: '下级页面',
        component: () => import('src/pages/sportsShoesCircle/high/mostHighTen') 
      },
      {
        path: 'low/mostLowTen',
        name: 'mostLowTen',
        title: '下级页面',
        component: () => import('src/pages/sportsShoesCircle/low/mostLowTen') 
      }          
    ]
  },
];

export const routes = [
  loginRouter,
  errorRouter,
  otherRouter,
  // sportsShoesCircleStation,
  ...appRouter
];
