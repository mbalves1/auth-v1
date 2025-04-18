import { defineStore } from "pinia";
import { createUser } from "~/composables/useUser";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, // Armazena os dados do usuário após o cadastro
    error: null,
    loading: false,
  }),

  actions: {
    async register(userData) {
      this.loading = true;
      this.error = null;

      try {
        this.user = await createUser(userData); // Chamada direta à função
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
