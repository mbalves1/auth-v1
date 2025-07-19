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
        const response = await createUser(userData); // Chamada direta à função
        this.user = response; // Armazena os dados do usuário no estado
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
