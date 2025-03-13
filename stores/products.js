import { defineStore } from "pinia";
import { getProducts } from "~/composables/useProduct";

export const useProductStore = defineStore("product", {
  state: () => ({
    product: [], // Armazena os dados do usuário após o cadastro
    error: null,
    loading: false,
  }),

  actions: {
    async getProducts() {
      try {
        const response = await getProducts();
        console.log(this.product);
        this.product = response;
        console.log('this', this.product);
        
        return response;
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
});
