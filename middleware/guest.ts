
export default defineNuxtRouteMiddleware((to, from) => {
  const sessionTokenCookie = useCookie("sessionToken");
  if (sessionTokenCookie.value) {
    return navigateTo("/");
  }
});

