import { defineStore } from "pinia";
import { getProducts, getProductsFixedIncome, getProductsRealEstate } from "~/composables/useProduct";

export const useProductStore = defineStore("product", {
  state: () => ({
    product: [], // Armazena os dados do usuário após o cadastro
    fixedIncomeProducts: [], // Armazena os dados do usuário após o cadastro
    realEstateProducts: [],
    error: null,
    loading: false,
  }),

  actions: {
    async getProducts() {
      try {
        const response = await getProducts();
        console.log(this.product);
        this.product = response;
        return response;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async getFixedIncome() {
      try {
        const response = await getProductsFixedIncome();
        this.fixedIncomeProducts = response
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async getRealEstate() {
      try {
        const response = await getProductsRealEstate();
        this.realEstateProducts = response
        console.log('this', this.realEstateProducts);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
});
