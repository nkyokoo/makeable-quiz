<template>
  <v-card>
    <v-card-title style="padding: 1rem">
      <h1>Heyo! Welcome to my quiz app</h1>
      <h3>Are you ready for a history quiz? Just select a difficulty in the menubar</h3>
    </v-card-title>
  </v-card>
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
