import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore/:n',
    name: 'explore',
    component: Explore
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
