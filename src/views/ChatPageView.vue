<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { loggedUser } from "../auth";
import { Action } from "../httpService";
import { url } from "../api";

const Id = ref("");

Id.value = useRoute().params.id;

const createPage = () => {
  Action.post(url + "/posts", {
    id: parseInt(Id.value) + parseInt(loggedUser.value.chatId),
  });
};

const IIDD = parseInt(Id.value) + parseInt(loggedUser.value.chatId);

const deletePage = () => {
  Action.delete(url + "/posts/" + IIDD);
};
</script>

<template>
  <div>
    <br /><br /><br /><br />
    <h1>Chat Page</h1>
    <h2>Id : {{ Id }}</h2>
    <h3>
      <v-btn @click="createPage">Create Page</v-btn>
    </h3>
    <h3>
      <v-btn @click="deletePage">Create Page</v-btn>
    </h3>
  </div>
</template>
