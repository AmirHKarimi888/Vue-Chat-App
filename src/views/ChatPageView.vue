<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { loggedUser } from "../auth";
import { Action } from "../httpService";
import { url } from "../api";

import { drawer, contactsDrawer, contactProfileDrawer } from "../script/index";
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

const addContact = () => {
  Action.post(url + "/comments", {
    id: unitedId,
    chatName: loggedUser.value.username + " - " + secondPersonUsername.value,
    chatId: loggedUser.value.chatId + " - " + secondPersonChatId.value,
    chatEmail: loggedUser.value.email + " - " + secondPersonEmail.value,
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

const deleteContact = () => {
  Action.delete(url + "/comments/" + unitedId)
    .then(() => {
      loggedUser.value.contacts = loggedUser.value.contacts.filter(
        (contact) => {
          if (contact.id !== secondPersonId.value) {
            return contact;
          }
        }
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
      secondPerson.value[0].contacts = secondPerson.value[0].contacts.filter(
        (contact) => {
          if (contact.id !== loggedUser.value.id) {
            return contact;
          }
        }
      );
    })
    .then(() => {
      Action.delete(url + "/users/" + secondPersonId.value).then(() => {
        Action.post(url + "/users", {
          ...secondPerson.value[0],
        });
      });
    });
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
      <v-app-bar-title
        style="cursor: pointer"
        @click="contactProfileDrawer = !contactProfileDrawer"
      >
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

    <v-navigation-drawer
      color="grey-darken-4"
      v-model="contactProfileDrawer"
      temporary
      location="top"
    >
      <v-list-item class="bg-grey-darken-3 pt-5 pb-5">
        <v-avatar>
          <v-img :src="secondPersonAvatar" alt="Avatar"></v-img>
        </v-avatar>
        <h4 class="mt-4">{{ secondPersonUsername }}</h4>
        <h5 class="">{{ secondPersonEmail }}</h5>
        <h5></h5>
      </v-list-item>

      <v-list density="compact" nav>
        <v-list-item
          @click="addContact"
          prepend-icon="mdi-magnify"
          title="Add To Your Contacts"
          value=""
        ></v-list-item>

        <v-list-item
          @click="deleteContact"
          prepend-icon="mdi-door"
          title="Block This User"
          value=""
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>

  <div>
    <v-virtual-scroll :items="items" height="500" item-height="50" class="mt-15">
      <template v-slot:default="{ item }">
        <v-list-item class="mt-3 bg-grey-darken-3 rounded-xl" min-width="33%" max-width="50%" height="90">
          <template v-slot:prepend>
            <v-avatar :color="item.color" class="text-white" size="40">
              {{ item.initials }}
            </v-avatar>
          </template>

          <v-list-item-title>{{ item.fullName }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script>
export default {
  data: () => ({
    colors: [
      "#2196F3",
      "#90CAF9",
      "#64B5F6",
      "#42A5F5",
      "#1E88E5",
      "#1976D2",
      "#1565C0",
      "#0D47A1",
      "#82B1FF",
      "#448AFF",
      "#2979FF",
      "#2962FF",
    ],
    names: [
      "Oliver",
      "Jake",
      "Noah",
      "James",
      "Jack",
      "Connor",
      "Liam",
      "John",
      "Harry",
      "Callum",
      "Mason",
      "Robert",
      "Jacob",
      "Jacob",
      "Jacob",
      "Michael",
      "Charlie",
      "Kyle",
      "William",
      "William",
      "Thomas",
      "Joe",
      "Ethan",
      "David",
      "George",
      "Reece",
      "Michael",
      "Richard",
      "Oscar",
      "Rhys",
      "Alexander",
      "Joseph",
      "James",
      "Charlie",
      "James",
      "Charles",
      "William",
      "Damian",
      "Daniel",
      "Thomas",
      "Amelia",
      "Margaret",
      "Emma",
      "Mary",
      "Olivia",
      "Samantha",
      "Olivia",
      "Patricia",
      "Isla",
      "Bethany",
    ],
    surnames: [
      "Smith",
      "Anderson",
      "Clark",
      "Wright",
      "Mitchell",
      "Johnson",
      "Thomas",
      "Rodriguez",
      "Lopez",
      "Perez",
      "Williams",
      "Jackson",
      "Lewis",
      "Hill",
      "Roberts",
      "Jones",
      "White",
      "Lee",
      "Scott",
      "Turner",
      "Brown",
      "Harris",
      "Walker",
      "Green",
      "Phillips",
      "Davis",
      "Martin",
      "Hall",
      "Adams",
      "Campbell",
      "Miller",
      "Thompson",
      "Allen",
      "Baker",
      "Parker",
      "Wilson",
      "Garcia",
      "Young",
      "Gonzalez",
      "Evans",
      "Moore",
      "Martinez",
      "Hernandez",
      "Nelson",
      "Edwards",
      "Taylor",
      "Robinson",
      "King",
      "Carter",
      "Collins",
    ],
  }),

  computed: {
    items() {
      const namesLength = this.names.length;
      const surnamesLength = this.surnames.length;
      const colorsLength = this.colors.length;

      return Array.from({ length: 20 }, (k, v) => {
        const name = this.names[this.genRandomIndex(namesLength)];
        const surname = this.surnames[this.genRandomIndex(surnamesLength)];

        return {
          color: this.colors[this.genRandomIndex(colorsLength)],
          fullName: `${name} ${surname}`,
          initials: `${name[0]} ${surname[0]}`,
        };
      });
    },
  },

  methods: {
    genRandomIndex(length) {
      return Math.ceil(Math.random() * (length - 1));
    },
  },
};
</script>
