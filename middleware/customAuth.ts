import { useAuthstore } from "~~/store/AuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthstore();
  console.log(to);
  if (!auth.isAuthenticated) {
    return navigateTo("/login");
  }
});
