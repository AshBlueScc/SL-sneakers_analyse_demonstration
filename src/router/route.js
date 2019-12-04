/**
 * @Project Name: vue-admin
 * @Author: luichooy
 * @Date: 2018-01-17 15:01
 * @Email: luichooy@163.com
 * @Idea: WebStorm
 */

import Layout from 'src/pages/layout/layout';

// 不作为main组件子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('src/pages/login/login')
};

//作为鞋圈组件的跳转的页面单独写
// export const sportsShoesCircleStation = {
//   path: '/brand',
//   name: 'brand',
//   title: '二级页面',
//   component: () => import('src/pages/sportsShoesCircle/brand') 
// }

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

// 作为main组件子页面展示  但不在左侧菜单显示的路由卸载otherRoter里
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
    path: '/tables',
    name: 'tables',
    title: '表格管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'basic',
        name: 'basic',
        title: '基本表格',
        component: () => import('src/pages/tables/basic')
      },
      {
        path: 'sort',
        name: 'sort',
        title: '排序表格',
        component: () => import('src/pages/tables/sort')
      },
      {
        path: 'filter',
        name: 'filter',
        title: '筛选表格',
        component: () => import('src/pages/tables/filter')
      }
    ]
  },
  {
    path: '/charts',
    name: 'charts',
    title: 'echarts图表',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'bar',
        name: 'bar',
        title: '柱状图',
        component: () => import('src/pages/charts/bar')
      },
      {
        path: 'line',
        name: 'line',
        title: '折线图',
        component: () => import('src/pages/charts/line')
      },
      {
        path: 'pie',
        name: 'pie',
        title: '饼图',
        component: () => import('src/pages/charts/pie')
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    title: '表单管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'render',
        name: 'render',
        title: '渲染表单',
        component: () => import('src/pages/form/render/render')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    title: '系统管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'system_index',
        title: '系统管理',
        component: () => import('src/pages/system/index/index')
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
        path: 'index',
        name: 'category',
        title: '一级页面（主页面）',
        component: () => import('src/pages/sportsShoesCircle/index')
      },
      {
        path: 'brand',
        name: 'brand',
        title: '二级页面',
        component: () => import('src/pages/sportsShoesCircle/brand') 
      },
      {
        path: 'product',
        name: 'product',
        title: '三级页面',
        component: () => import('src/pages/sportsShoesCircle/product') 
      },
      {
        path: 'productDetail',
        name: 'productDetail',
        title: '四级页面',
        component: () => import('src/pages/sportsShoesCircle/productDetail') 
      }        
    ]
  },
  {
    path: '/database',
    name: 'database',
    title: '数据库管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'category',
        name: 'category_index',
        title: '品类管理',
        component: () => import('src/pages/database/category')
      }, 
      {
        path: 'brand',
        name: 'brand_index',
        title: '商标管理',
        component: () => import('src/pages/database/brand')
      }, 
      {
        path: 'product',
        name: 'product_index',
        title: '产品管理',
        component: () => import('src/pages/database/product')
      }, 
      {
        path: 'product_detail',
        name: 'product_detail_index',
        title: '产品详细数据管理',
        component: () => import('src/pages/database/product_detail')
      }, 
      {
        path: 'product_sold_detail',
        name: 'product_sold_detail_index',
        title: '产品卖出数目管理',
        component: () => import('src/pages/database/product_sold_detail')
      }, 
      {
        path: 'product_history_price',
        name: 'product_history_price_index',
        title: '产品历史价格管理',
        component: () => import('src/pages/database/product_history_price')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    title: '测试',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'test_index',
        title: '测试',
        component: () => import('src/pages/test/test')
      }
    ]
  }
];

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  // sportsShoesCircleStation,
  ...appRouter
];
