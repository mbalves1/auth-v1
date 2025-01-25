import { ref } from 'vue';

// Estado global compartilhado
const alert = ref({
  visible: false,
  title: '',
  description: '',
  color: 'primary',
  icon: 'i-heroicons-command-line',
});

// Composable para gerenciar o estado do alerta
export function useAlert() {
  const showAlert = (
    {
      title,
      description,
      color = 'primary',
      icon = 'i-heroicons-command-line',
      time = 7000
    }) => {
    alert.value = {
      visible: true,
      title,
      description,
      color,
      icon,
    };

    setTimeout(() => {
      alert.value.visible = false;
    }, time)
  };

  const hideAlert = () => {
    alert.value.visible = false;
  };

  return {
    alert,
    showAlert,
    hideAlert,
  };
}
