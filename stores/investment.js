import { defineStore } from "pinia";
import { postSimpleInvestment, getUserInvestment } from "~/composables/useInvestments";

export const useInvestmentStore = defineStore("investment", {
  state: () => ({
    simpleInvestment: [],
    userInvestments: [],
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
    },
    async getUserInvestment(token) {
      try {
        const response = await getUserInvestment(token);
        console.log('response', response);
        
        this.userInvestments = response;
        return response;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
});
