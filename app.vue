<template>
  <v-app :theme="theme">
    <v-app-bar app>
      <v-btn v-for="i in menuItems" text :to="i.to">
        {{ i.title }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :prepend-icon="
          theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="onClick"
        >Toggle Theme</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
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
    onClick() {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  },
};
</script>
