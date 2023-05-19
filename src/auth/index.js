import { ref } from "vue";
import { url } from "../api";
import { Action } from "../httpService";

const loggedUser = ref({});
const id = localStorage.getItem("loggedUser");
Action.get(url + "/users/" + id, (response) => loggedUser.value = response.data);


export { loggedUser };