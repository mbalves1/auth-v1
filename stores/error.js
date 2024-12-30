import { defineStore } from 'pinia'

export const useNotification = defineStore('notification', {
  state: () => ({
    notification: {
      show: false,
      title: 'Pinia Title',
      message: 'Se pa',
      colorText: 'text-green-700',
      colorBorder: 'border-green-400'
    },
  }),
  actions: {
    sendNotification(payload) {
      
      this.notification = {
        title: payload.title,
        message: payload.message,
        colorText: payload.colorText,
        colorBorder: payload.colorBorder,
        show: payload.show
      }
    },
  }
})
