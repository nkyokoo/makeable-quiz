import { useAuthstore } from "~~/store/AuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthstore();
  if (auth.isAuthenticated) {
    return navigateTo("/");
  }
});
