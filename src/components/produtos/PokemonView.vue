
<script setup lang="ts">
import { ref, watch } from 'vue'
import api from '../../services/api'

interface PokemonDetalhe {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null
      }
    }
    front_default: string | null
  }
  types: {
    type: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
}

const props = defineProps<{
  id: string
}>()

const pokemon = ref<PokemonDetalhe | null>(null)
const carregando = ref(true)
const erro = ref('')

watch(
  () => props.id,
  async (id) => {
    carregando.value = true
    erro.value = ''
    pokemon.value = null

    try {
      const resposta = await api.get(`pokemon/${id}`)
      pokemon.value = resposta.data
    } catch {
      erro.value = 'Não foi possível encontrar esse Pokémon.'
    } finally {
      carregando.value = false
    }
  },
  { immediate: true }
)

function formatarNome(nome: string) {
  return nome
    .split('-')
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ')
}

function nomeAtributo(nome: string) {
  const nomes: Record<string, string> = {
    hp: 'Vida',
    attack: 'Ataque',
    defense: 'Defesa',
    'special-attack': 'Ataque especial',
    'special-defense': 'Defesa especial',
    speed: 'Velocidade'
  }

  return nomes[nome] || formatarNome(nome)
}
</script>

<template>
  <section class="detalhes">
    <RouterLink to="/" class="voltar">
      ← Voltar para a Pokédex
    </RouterLink>

    <div v-if="carregando" class="estado">
      <div class="spinner"></div>
      <p>Carregando informações...</p>
    </div>

    <div v-else-if="erro" class="estado">
      <p>{{ erro }}</p>
      <RouterLink to="/" class="botao">
        Voltar para Home
      </RouterLink>
    </div>

    <article v-else-if="pokemon" class="painel-pokemon">
      <div class="imagem-pokemon">
        <span class="numero">
          #{{ String(pokemon.id).padStart(3, '0') }}
        </span>

        <img
          :src="
            pokemon.sprites.other['official-artwork'].front_default ||
            pokemon.sprites.front_default ||
            ''
          "
          :alt="pokemon.name"
        />
      </div>

      <div class="informacoes">
        <span class="etiqueta">FICHA DO POKÉMON</span>
        <h1>{{ formatarNome(pokemon.name) }}</h1>

        <div class="tipos">
          <span
            v-for="item in pokemon.types"
            :key="item.type.name"
            class="tipo"
            :class="`tipo-${item.type.name}`"
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
          v-for="item in pokemon.stats"
          :key="item.stat.name"
          class="atributo"
        >
          <div class="atributo-cabecalho">
            <span>{{ nomeAtributo(item.stat.name) }}</span>
            <strong>{{ item.base_stat }}</strong>
          </div>

          <div class="barra">
            <div
              class="barra-preenchida"
              :style="{
                width: `${Math.min(item.base_stat / 255 * 100, 100)}%`
              }"
            ></div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
