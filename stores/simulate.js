import { defineStore } from "pinia";
import { getSimulate } from "~/composables/useSimulate";

export const useSimulateStore = defineStore("simulate", {
  state: () => ({
    simulateWallet: [],
    error: null,
    loading: false,
  }),

  actions: {
    async getSimulateWallet(token) {
      try {
        const response = await getSimulate(token);
        this.simulateWallet = response;
        return response;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
});
