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
      icon = 'i-heroicons-command-line'
    }) => {
    console.log('showAlert chamado', { title, description, color, icon }); // Log do chamado
    alert.value = {
      visible: true,
      title,
      description,
      color,
      icon,
    };
    console.log('alert atualizado', alert.value); // Log do estado atualizado
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
