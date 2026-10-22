<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '../services/api'
import ListaPokemon from '../components/pokedex/ListaPokemon.vue'

interface Pokemon {
  name: string
  id: number
}

const pokemon = ref<Pokemon[]>([])
const pesquisa = ref('')
const carregando = ref(true)
const erro = ref('')

const pokemonFiltrados = computed(() => {
  return pokemon.value.filter((item) =>
    item.name.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
    String(item.id).includes(pesquisa.value)
  )
})

onMounted(async () => {
  try {
    const resposta = await api.get('pokemon?limit=151')

    pokemon.value = resposta.data.results.map(
      (item: { name: string; url: string }) => {
        const id = Number(
          item.url.split('/').filter(Boolean).pop()
        )

        return {
          name: item.name,
          id
        }
      }
    )
  } catch {
    erro.value = 'Não foi possível carregar os Pokémon.'
  } finally {
    carregando.value = false
  }
})
</script>

<template>
  <section class="home">
    <div class="introducao">
      <p class="etiqueta">SUA AVENTURA COMEÇA AQUI</p>

      <h1>Explore a Pokédex</h1>

      <p>
        Descubra os primeiros 151 Pokémon e conheça suas características.
      </p>
    </div>

    <input
      v-model="pesquisa"
      class="pesquisa"
      type="text"
      placeholder="Pesquisar por nome ou número..."
    />

    <p v-if="carregando" class="mensagem">
      Carregando Pokémon...
    </p>

    <p v-else-if="erro" class="mensagem">
      {{ erro }}
    </p>

    <p v-else-if="pokemonFiltrados.length === 0" class="mensagem">
      Nenhum Pokémon encontrado.
    </p>

    <ListaPokemon
      v-else
      :pokemon="pokemonFiltrados"
    />
  </section>
</template>