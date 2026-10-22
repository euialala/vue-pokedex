<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

interface PokemonDetalhe {
  id: number
  name: string
  height: number
  weight: number
  types: { type: { name: string } }[]
  stats: {
    base_stat: number
    stat: { name: string }
  }[]
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null
      }
    }
  }
}

const route = useRoute()
const pokemon = ref<PokemonDetalhe | null>(null)
const carregando = ref(true)
const erro = ref('')

onMounted(async () => {
  try {
    const resposta = await api.get(
      `pokemon/${route.params.id}`
    )

    pokemon.value = resposta.data
  } catch {
    erro.value = 'Não foi possível encontrar esse Pokémon.'
  } finally {
    carregando.value = false
  }
})

function formatarNome(nome: string) {
  return nome
    .split('-')
    .map(palavra =>
      palavra.charAt(0).toUpperCase() + palavra.slice(1)
    )
    .join(' ')
}
</script>

<template>
  <section class="detalhes">
    <RouterLink to="/" class="voltar">
      ← Voltar para a Pokédex
    </RouterLink>

    <p v-if="carregando" class="mensagem">
      Carregando detalhes...
    </p>

    <p v-else-if="erro" class="mensagem">
      {{ erro }}
    </p>

    <div v-else-if="pokemon" class="painel-pokemon">
      <div class="imagem-pokemon">
        <span class="numero">
          #{{ String(pokemon.id).padStart(3, '0') }}
        </span>

        <img
          :src="pokemon.sprites.other['official-artwork'].front_default
            || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
          :alt="pokemon.name"
        />
      </div>

      <div class="informacoes">
        <p class="etiqueta">DETALHES DO POKÉMON</p>

        <h1>{{ formatarNome(pokemon.name) }}</h1>

        <div class="tipos">
          <span
            v-for="item in pokemon.types"
            :key="item.type.name"
            class="tipo"
          >
            {{ formatarNome(item.type.name) }}
          </span>
        </div>

        <div class="medidas">
          <div>
            <span>Altura</span>
            <strong>{{ (pokemon.height / 10).toFixed(1) }} m</strong>
          </div>

          <div>
            <span>Peso</span>
            <strong>{{ (pokemon.weight / 10).toFixed(1) }} kg</strong>
          </div>
        </div>

        <h2>Atributos base</h2>

        <div
          v-for="stat in pokemon.stats"
          :key="stat.stat.name"
          class="atributo"
        >
          <div class="atributo-cabecalho">
            <span>{{ formatarNome(stat.stat.name) }}</span>
            <strong>{{ stat.base_stat }}</strong>
          </div>

          <div class="barra">
            <div
              class="barra-preenchida"
              :style="{
                width: `${Math.min(stat.base_stat / 255 * 100, 100)}%`
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>