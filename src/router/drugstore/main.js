export default {
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      name: 'home',
      path: '',
      component: () => import('pages/IndexPage.vue')
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

