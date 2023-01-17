export const useAuthstore = defineStore({
  id: "auth",
  state: () => ({
    sessionToken: "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.sessionToken,
  },
  actions: {
    setSessionToken(token: string) {
      this.sessionToken = token;
    },
  },
});
