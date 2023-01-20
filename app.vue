<template>
  <v-app :theme="theme">
    <v-navigation-drawer v-model="drawer" v-if="isAuthenticated">
      <v-list>
        <v-list-item v-for="i in menuItems" :key="i.title" :to="i.to">
          <v-list-item-title>{{ i.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app v-if="isAuthenticated">
      <v-app-bar-nav-icon v-if="$vuetify.display.mobile" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div v-if="!$vuetify.display.mobile">
        <v-btn v-for="i in menuItems" :to="i.to">
          {{ i.title }}
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="logOut">
        Log out
      </v-btn>
      <v-btn :prepend-icon="
        theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      " @click="changeTheme">Toggle Theme</v-btn>
    </v-app-bar>
    <v-main>
      <v-container v-if="!this.$vuetify.display.mobile">
        <router-view></router-view>
      </v-container>
      <router-view v-else></router-view>
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
      drawer: false,
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
