
<script setup lang="ts">
interface Pokemon {
  name: string
  url: string
}

defineProps<{
  pokemon: Pokemon[]
}>()

function obterId(url: string): number {
  return Number(url.split('/').filter(Boolean).pop())
}
</script>

<template>
  <div class="lista-pokemon">
    <RouterLink
      v-for="item in pokemon"
      :key="item.name"
      :to="`/pokemon/${obterId(item.url)}`"
      class="card-pokemon"
    >
      <span class="numero">
        #{{ String(obterId(item.url)).padStart(3, '0') }}
      </span>

      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${obterId(item.url)}.png`"
        :alt="item.name"
        loading="lazy"
      />

      <h3>{{ item.name }}</h3>
      <span class="ver-detalhes">Ver detalhes →</span>
    </RouterLink>
  </div>
</template>
