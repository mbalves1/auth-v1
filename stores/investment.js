import { defineStore } from "pinia";
import { postSimpleInvestment } from "~/composables/useInvestments";

export const useInvestmentStore = defineStore("investment", {
  state: () => ({
    simpleInvestment: [],
    error: null,
    loading: false,
  }),

  actions: {
    async createSimpleInvestment(token, data) {
      try {
        const response = await postSimpleInvestment(token, data);
        this.simpleInvestment = response;
        return response;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
});
