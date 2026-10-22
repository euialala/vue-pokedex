
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../components/produtos/HomeView.vue'
import PokemonView from '../components/produtos/PokemonView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: PokemonView,
      props: true
    }
  ]
})

export default router
