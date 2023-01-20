<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title style="padding: 1rem">
          Heyo! Welcome to my quiz app
        </v-card-title>
        <v-card-text>
          Are you ready for a history quiz? Just select a difficulty in the {{ !$vuetify.display.mobile ?  "menubar above" : "drawer" }}!
          <br />
          <br />
          This is a nuxt 3 app, running vue and typescript. It uses the vuetify 3 library. It fetches questions from the
          opentdb api using the in built <code>useFetch</code> function
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "custom-auth",
});
</script>
<script lang="ts">
export default {
  name: "Home",
  middleware: "customAuth",
};
</script>
