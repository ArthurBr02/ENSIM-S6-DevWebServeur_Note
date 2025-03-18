<script>
import Card from "primevue/card";

import authenticationService from "@/services/authenticationService.js";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export default {
  name: "LoginView",
  components: {
    Card,
  },
  data() {
    return {
      email: "arthurbratigny@gmail.com",
      password: "arthurtest"
    };
  },
  methods: {
    login() {
      authenticationService
        .login(this.email, this.password)
        .then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(jwtDecode(data.token)));
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          this.$router.push({ name: "home" });
        })
        .catch((e) => {
          this.password = "";
          this.$toast.add({
            severity: "error",
            summary: "Erreur",
            detail: "Identifiants incorrects",
          });
        });
    }
  }
}
</script>

<template>
  <div class="mt-20">
    <Toast/>
    <Card>
      <template #title>Connexion</template>
      <template #content>
        <div class="flex flex-col gap-3">
          <InputText v-model="email" placeholder="Email" type="email"/>
          <InputText v-model="password" placeholder="Password" type="password"/>
          <Button label="Login" @click="login()" class="p-button-success"/>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>