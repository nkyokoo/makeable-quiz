export const useAuthStore = defineStore("auth", () => {
  const sessionToken = ref<string>(useCookie("sessionToken").value ?? "");

  const fetchToken = computed((): string => {
    return sessionToken.value;
  });
  const isAuthenticated = computed((): boolean => {
    return !!sessionToken.value;
  });
  function setSessionToken(token: string) {
    sessionToken.value = token;
    window.document.cookie = `sessionToken=${token}`;
  }
  function logOut() {
    sessionToken.value = "";
    window.document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  return { sessionToken, isAuthenticated, fetchToken, setSessionToken, logOut };
});
