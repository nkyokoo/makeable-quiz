<template>
  <v-row>
    <v-col v-if="!$vuetify.display.mobile"></v-col>
    <v-col>
      <v-card>
        <v-card-title style="margin-top: 1rem; margin-bottom: 1rem">
          <h1>Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="email" label="Email" :rules="emailRules" filled type="email" required></v-text-field>
            <v-text-field v-model="password" label="Password" :rules="passwordRules" filled type="password"
              required></v-text-field>
            <v-btn @click="login">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-if="!$vuetify.display.mobile"></v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "guest",
});
</script>
<script lang="ts">
import { useAuthStore } from "~/stores/AuthStore";
import { SessionTokenResponse } from "~~/dto/sessionrokenresponse";

const authStore = useAuthStore();

export default {
  name: "Login",
  middleware: "Guest",
  data() {
    return {
      auth: authStore,
      email: "",
      emailRules: [
        (v: string) => !!v || "E-mail is required",
        (v: string) => {
          const isValid =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
              v
            );
          if (!isValid) {
            return "E-mail must be valid";
          } else {
            return true;
          }
        },
      ],
      password: "",
      passwordRules: [(v: string) => !!v || "Password is required"],
    };
  },
  methods: {
    async login() {
      if (this.email == "" || this.password == "") {
        return;
      }
      if (this.email == "test@example.com" || this.password == "test123") {
        const { data } = await useFetch(
          "https://opentdb.com/api_token.php?command=request"
        );
        const sessionResponse = data.value as SessionTokenResponse;
        this.auth.setSessionToken(sessionResponse.token);
        navigateTo("/");
      }
    },
  },
};
</script>
