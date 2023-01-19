<template>
  <v-app :theme="theme">
    <v-app-bar app v-if="isAuthenticated">
      <v-btn v-for="i in menuItems" :to="i.to">
        {{ i.title }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="logOut">
        Log out
      </v-btn>
      <v-btn :prepend-icon="
        theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      " @click="changeTheme">Toggle Theme</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useAuthStore } from './stores/AuthStore';
import { mapState } from "pinia";



export default {
  name: "App",
  data() {
    return {
      menuItems: [
        {
          title: "Home",
          to: "/",
        },
        {
          title: "easy",
          to: "/difficulty/easy",
        },
        {
          title: "medium",
          to: "/difficulty/medium",
        },
        {
          title: "hard",
          to: "/difficulty/hard",
        },
      ],
      theme: "dark",
    };
  },
  methods: {
    changeTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
    logOut() {
      const store = useAuthStore();
      store.logOut();
      navigateTo("/login");
    },
  },
  computed: {
    ...mapState(useAuthStore, ['sessionsToken', 'isAuthenticated'])
  },
};
</script>
