
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'
import ListaPokemon from '../pokedex/ListaPokemon.vue'

interface Pokemon {
  name: string
  url: string
}

const pokemon = ref<Pokemon[]>([])
const pesquisa = ref('')
const carregando = ref(true)
const erro = ref('')

const pokemonFiltrados = computed(() => {
  const termo = pesquisa.value.trim().toLowerCase()

  return pokemon.value.filter((item) => {
    const id = item.url.split('/').filter(Boolean).pop() || ''

    return (
      item.name.toLowerCase().includes(termo) ||
      id.includes(termo)
    )
  })
})

async function carregarPokemon() {
  carregando.value = true
  erro.value = ''

  try {
    const resposta = await api.get('pokemon?limit=151')
    pokemon.value = resposta.data.results
  } catch {
    erro.value = 'Não foi possível carregar os Pokémon. Verifique sua conexão.'
  } finally {
    carregando.value = false
  }
}

onMounted(carregarPokemon)
</script>

<template>
  <section class="home">
    <div class="introducao">
      <span class="etiqueta">EXPLORE O MUNDO POKÉMON</span>
      <h1>Sua Pokédex</h1>
      <p>Encontre seus Pokémon favoritos e descubra suas informações.</p>
    </div>

    
<header class="header">
  <div class="logo">Poké<span>Dex</span></div>

  <div class="header-links">
    <RouterLink to="/login" class="login-link">
      Login
    </RouterLink>

    <RouterLink to="/register" class="register-link">
      Cadastrar
    </RouterLink>
  </div>
</header>



    <input
      v-model="pesquisa"
      class="pesquisa"
      type="search"
      placeholder="Pesquisar Pokémon por nome ou número..."
    />

    <div class="resumo">
      <h2>Primeira geração</h2>
      <span>{{ pokemonFiltrados.length }} Pokémon</span>
    </div>

    <div v-if="carregando" class="estado">
      <div class="spinner"></div>
      <p>Carregando Pokédex...</p>
    </div>

    <div v-else-if="erro" class="estado">
      <p>{{ erro }}</p>
      <button class="botao" @click="carregarPokemon">
        Tentar novamente
      </button>
    </div>

    <div v-else-if="pokemonFiltrados.length === 0" class="estado">
      <p>Nenhum Pokémon encontrado.</p>
    </div>

    <ListaPokemon
      v-else
      :pokemon="pokemonFiltrados"
    />
  </section>
</template>


