<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loggedUser } from '../auth';

const router = useRouter();

const goToPath = (chatId) => {
  router.push({ name: "chat-page", params: { chatId: chatId } })
  .then(() => {
    setTimeout(() => {
      window.location.reload()
    }, 100)
  })
}
</script>

<template>
    <div v-if="loggedUser.isLogin">

    <v-list density="compact" nav>
        <v-list-item v-for="contact in loggedUser.contacts" :key="contact.username" style="cursor: pointer;" value="">
            <a @click="() => goToPath(contact.chatId)" class="text-decoration-none text-white">
            <v-avatar>
            <v-img :src="contact.avatar"></v-img>
          </v-avatar>
          <a class="ms-12">{{ contact.username }}</a>
        </a>
        </v-list-item>
    </v-list>
  </div>
</template>