<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { loggedUser } from "../auth";
import { Action } from "../httpService";
import { url } from "../api";

import { drawer, contactsDrawer } from "../script/index";
import SideBarView from "../components/SidebarView.vue";
import ContactsBarView from "../components/ContactsBarView.vue";

const users = ref([]);
const secondPerson = ref({});

const secondPersonId = ref("");
const secondPersonChatId = ref("");
secondPersonChatId.value = useRoute().params.chatId;
const secondPersonUsername = ref("");
const secondPersonEmail = ref("");
const secondPersonAvatar = ref("");

onMounted(() => {
  Action.get(url + "/users", (response) => (users.value = response.data))
    .then(() => {
      secondPerson.value = users.value.filter((user) => {
        if (parseInt(user.chatId) === parseInt(secondPersonChatId.value)) {
          return { ...user };
        }
      });
    })
    .then(() => {
      secondPersonId.value = secondPerson.value[0].id;
      secondPersonUsername.value = secondPerson.value[0].username;
      secondPersonEmail.value = secondPerson.value[0].email;
      secondPersonAvatar.value = secondPerson.value[0].avatar;
    });
});

const unitedId =
  parseInt(secondPersonChatId.value) + parseInt(loggedUser.value.chatId);

const createPage = () => {
  Action.post(url + "/comments", {
    id: unitedId,
    chatName: loggedUser.value.username + " - " + secondPersonUsername.value,
    chatId: loggedUser.value.chatId + " - " + secondPersonChatId.value,
    chatEmail : loggedUser.value.email + " - " + secondPersonEmail.value,
    chats: [],
  })
    .then(() => {
      loggedUser.value.contacts.push(
        ...[
          {
            id: secondPersonId.value,
            chatId: secondPersonChatId.value,
            username: secondPersonUsername.value,
            avatar: secondPersonAvatar.value,
          },
        ]
      );
    })
    .then(() => {
      Action.delete(url + "/users/" + loggedUser.value.id).then(() => {
        Action.post(url + "/users", {
          ...loggedUser.value,
        });
      });
    })

    .then(() => {
      secondPerson.value[0].contacts.push(
        ...[
          {
            id: loggedUser.value.id,
            chatId: loggedUser.value.chatId,
            username: loggedUser.value.username,
            avatar: loggedUser.value.avatar,
          },
        ]
      );
    })
    .then(() => {
      Action.delete(url + "/users/" + secondPerson.value[0].id).then(() => {
        Action.post(url + "/users", {
          ...secondPerson.value[0],
        });
      });
    });
};

const deletePage = () => {
  Action.delete(url + "/comments/" + unitedId);
};
</script>

<template>
  <header class="header">
    <v-app-bar color="grey-darken-4" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          v-if="loggedUser.isLogin"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        <v-avatar>
          <v-img :src="secondPersonAvatar" alt="Avatar"></v-img>
        </v-avatar>
        {{ secondPersonUsername }}
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn
          icon
          v-if="loggedUser.isLogin"
          @click.stop="contactsDrawer = !contactsDrawer"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer color="grey-darken-4" v-model="drawer" temporary>
      <SideBarView />
    </v-navigation-drawer>

    <v-navigation-drawer
      color="grey-darken-4"
      v-model="contactsDrawer"
      temporary
      location="right"
    >
      <ContactsBarView />
    </v-navigation-drawer>
  </header>
  <div>
    <br /><br /><br /><br />
    <h1>Chat Page</h1>
    <h2>Id : {{ unitedId }}</h2>
    <h3>
      <v-btn @click="createPage">Create Page</v-btn>
    </h3>
    <h3>
      <v-btn @click="deletePage">Delete Page</v-btn>
    </h3>
  </div>
</template>
