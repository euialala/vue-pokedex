import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/view/HomeView.vue'
import PokemonView from '../components/view/PokemonView.vue'
import Login from '../components/view/Login.vue'
import Register from '../components/view/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/login', component: Login },
    { path: '/register', component: Register }, 
    { path: '/pokemon/:id', component: PokemonView, props: true }
  ]
})

export default router