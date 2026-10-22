
<template>
  <div class="app">
    <header class="cabecalho">
      <RouterLink to="/" class="logo">
        Poké<span>Dex</span>
      </RouterLink>

      <span class="subtitulo">Seu guia do mundo Pokémon</span>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="rodape">
      Pokédex desenvolvida com Vue 3 e PokéAPI
    </footer>
  </div>
</template>
