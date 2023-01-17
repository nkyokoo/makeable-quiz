<template>
  <v-card>
    <v-card-title>
      <h1>Home</h1>
    </v-card-title>
    <v-card-text>
      <p>Home page</p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Home",
  middleware: "auth",
};
</script>