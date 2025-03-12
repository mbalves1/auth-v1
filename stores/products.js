import { defineStore } from "pinia";
import { getProducts } from "~/composables/useProduct";

export const useProductStore = defineStore("product", {
  state: () => ({
    product: null, // Armazena os dados do usuário após o cadastro
    error: null,
    loading: false,
  }),

  actions: {
    async getProducts() {
      try {
        this.product = await getProducts();
        console.log(this.product);
        
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
});
