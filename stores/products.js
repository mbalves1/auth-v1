import { defineStore } from "pinia";
import { getProducts, getProductsFixedIncome, getProductsRealEstate } from "~/composables/useProduct";

export const useProductStore = defineStore("product", {
  state: () => ({
    product: [], // Armazena os dados do usuário após o cadastro
    fixedIncomeProducts: [], // Armazena os dados do usuário após o cadastro
    realEstateProducts: [],
    stocksProducts: [],
    cryptProducts: [],
    error: null,
    loading: false,
  }),

  actions: {
    async getProducts() {
      try {
        const response = await getProducts();
        this.product = response;
        return response;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async getFixedIncome() {
      try {
        const response = await getProductsFixedIncome();
        this.fixedIncomeProducts = response;
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async getRealEstate() {
      try {
        const response = await getProductsRealEstate();
        this.realEstateProducts = response;
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async getProductsStocks() {
      try {
        const response = await getProductsStocks();
        this.stocksProducts = response
        console.log('this', this.stocksProducts);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async getProductsCrypto() {
      try {
        const response = await getProductsCrypto();
        this.cryptProducts = response
        console.log('this', this.cryptProducts);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
});
