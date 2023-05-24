<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { loggedUser } from "../auth";
import { Action } from "../httpService";
import { url } from "../api";

const secondPersonChatId = ref("");
secondPersonChatId.value = useRoute().params.chatId;

const users = ref([]);
const secondPerson = ref({});
const secondPersonId = ref("");

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
  })
  .then(() => {
    secondPerson.value[0].contacts.push(...[{ "hi": "hi" }]);
    secondPerson.value[0].contacts.push(...[{ "bye": "bye" }]);
    console.log(secondPerson.value[0].contacts)
  })

const unitedId =
  parseInt(secondPersonChatId.value) + parseInt(loggedUser.value.chatId);

const createPage = () => {
  Action.post(url + "/comments", {
    id: unitedId,
  })
  .then(() => {
    loggedUser.value.contacts.push(...[{ id: secondPersonId.value }]);
  })
  .then(() => {
    Action.delete(url + "/users/" + loggedUser.value.id).then(() => {
      Action.post(url + "/users", {
        ...loggedUser.value
      });
    });
  });
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
