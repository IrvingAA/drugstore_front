export default {
  path: '/login',
  component: () => import(/* webpackChunkName: "login" */'src/pages/auth/Login'),
}
