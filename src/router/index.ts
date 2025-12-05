import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory('/app/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/about/info',
      name: 'info',
      component: () => import('../views/InfoView.vue'),
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: () => import('../views/PreferenceView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  to.meta.depth = to.path.match(/\//g)?.length || 1
  to.meta.prevDepth = from.path.match(/\//g)?.length || 1

  next()
})

export default router
