import { ref } from "vue";

import { set, get, ref as REF, child } from "firebase/database";
import { database } from "../firebase";

const dbRef = REF(database);

const id = localStorage.getItem("loggedUser");
const accessId = ref("");

const loggedUser = ref({});

const users = ref([]);

get(child(dbRef, "/users"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      users.value = snapshot.val();
    } else {
      console.log("No data available");
    }
  })
  .then(() => {
    accessId.value = users.value.findIndex((x) => x.id === id);
  })
  .then(() => {
    get(child(dbRef, `/users/` + accessId.value)).then((snapshot) => {
      if (snapshot.exists()) {
        loggedUser.value = snapshot.val();
      } else {
        console.log("No data available");
      }
    });
  });

const logOut = () => {
  localStorage.setItem("loggedUser", 0);

  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

export { loggedUser, accessId, users, logOut };
