<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { loggedUser } from "../auth";
import { Action } from "../httpService";
import { url } from "../api";

const users = ref([]);
const secondPerson = ref({});

const secondPersonChatId = ref("");
secondPersonChatId.value = useRoute().params.chatId;

Action.get(url + "/users", (response) => (users.value = response.data))
  .then(() => {
    secondPerson.value = users.value.filter((user) => {
      if (parseInt(user.chatId) === parseInt(secondPersonChatId.value)) {
        return { ...user };
      }
    });
  })

const unitedId =
  parseInt(secondPersonChatId.value) + parseInt(loggedUser.value.chatId);

const createPage = () => {
  Action.post(url + "/comments", {
    id: unitedId,
    chatName: loggedUser.value.username + ' - ' + secondPerson.value[0].username,
    chats: []
  })
    .then(() => {
      loggedUser.value.contacts.push(
        ...[
          {
            id: secondPerson.value[0].id,
            chatId: secondPerson.value[0].chatId,
            username: secondPerson.value[0].username,
            avatar: secondPerson.value[0].avatar,
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
    })
    
};

const deletePage = () => {
  Action.delete(url + "/comments/" + unitedId);
};
</script>

<template>
  <div>
    <br /><br /><br /><br />
    <h1>Chat Page</h1>
    <h2>Id : {{ unitedId }}</h2>
    <h3>
      <v-btn @click="createPage">Create Page</v-btn>
    </h3>
    <h3>
      <v-btn @click="deletePage">Create Page</v-btn>
    </h3>
  </div>
</template>
