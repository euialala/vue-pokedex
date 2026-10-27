
<template>
  <div class="auth-container">
    <form class="auth-card" @submit.prevent="fazerLogin">
      <h1>Entrar</h1>
      <p>Acesse sua conta da Pokédex</p>

      <label for="email">E-mail</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Digite seu e-mail"
        required
      />

      <label for="senha">Senha</label>
      <input
        id="senha"
        v-model="senha"
        type="password"
        placeholder="Digite sua senha"
        required
      />

      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>

      <button type="submit">Entrar</button>

      <p class="link-text">
        Ainda não tem conta?
        <RouterLink to="/register">Cadastre-se</RouterLink>
      </p>

      <RouterLink to="/" class="voltar">
        Voltar para a Pokédex
      </RouterLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const email = ref('')
const senha = ref('')
const mensagem = ref('')

function fazerLogin() {
  mensagem.value = ''

  // Login demonstrativo: ainda não verifica usuários cadastrados.
  if (email.value.trim() && senha.value) {
    router.push('/')
  } else {
    mensagem.value = 'Preencha todos os campos.'
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 30px;
  border-radius: 16px;
  background: white;
  color: #222;
  box-shadow: 0 4px 20px #0002;
}

h1, p {
  text-align: center;
}

.auth-card input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.auth-card button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #e3350d;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.link-text {
  margin-top: 12px;
}

.voltar {
  text-align: center;
}

.mensagem {
  color: #d00;
}
</style>
