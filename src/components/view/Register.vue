
<template>
  <div class="auth-container">
    <form class="auth-card" @submit.prevent="cadastrar">
      <h1>Criar conta</h1>
      <p>Cadastre-se para continuar</p>

      <label for="nome">Nome</label>
      <input
        id="nome"
        v-model="nome"
        type="text"
        placeholder="Digite seu nome"
        required
      />

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
        placeholder="Crie uma senha"
        minlength="6"
        required
      />

      <label for="confirmar">Confirmar senha</label>
      <input
        id="confirmar"
        v-model="confirmarSenha"
        type="password"
        placeholder="Digite a senha novamente"
        required
      />

      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>

      <button type="submit">Cadastrar</button>

      <p class="link-text">
        Já tem uma conta?
        <RouterLink to="/login">Entrar</RouterLink>
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

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const mensagem = ref('')

function cadastrar() {
  mensagem.value = ''

  if (senha.value !== confirmarSenha.value) {
    mensagem.value = 'As senhas não coincidem.'
    return
  }

  // Cadastro demonstrativo: ainda não salva em banco de dados.
  router.push('/login')
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
