import {RouterView} from "vue-router";

export default {
  path: '/settings',
  component: RouterView,
  children: [
    {
      name: 'admin',
      path: '',
      component: () => import('pages/admin/AdminIndex.vue')
    },
    {
      name: 'users',
      path: 'users',
      component: () => import('pages/admin/users/Index.vue')
    },
    {
      name: 'products',
      path: 'products',
      component: () => import('pages/admin/products/Index.vue')
    },

  ],
  beforeEnter: (to, from, next) => {
    if (sessionStorage.getItem('drugstore_token')) {
      next();
    } else {
      next('/login');
    }
  }

}

