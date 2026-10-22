<script setup lang="ts">
interface Pokemon {
  name: string
  id: number
}

defineProps<{
  pokemon: Pokemon[]
}>()
</script>

<template>
  <div class="lista-pokemon">
    <RouterLink
      v-for="item in pokemon"
      :key="item.id"
      :to="`/pokemon/${item.id}`"
      class="card-pokemon"
    >
      <span class="numero">
        #{{ String(item.id).padStart(3, '0') }}
      </span>

      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`"
        :alt="item.name"
        loading="lazy"
      />

      <h3>{{ item.name }}</h3>

      <span class="ver-detalhes">Ver detalhes →</span>
    </RouterLink>
  </div>
</template>