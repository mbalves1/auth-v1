import { ref, onMounted, onUnmounted } from 'vue';

export function useMobile() {
  const mobile = ref(false); // Inicializa como `false` para evitar erro no SSR

  const checkScreen = () => {
    if (typeof window !== 'undefined') {
      mobile.value = window.innerWidth < 640;
    }
  };

  onMounted(() => {
    checkScreen(); // Atualiza quando o componente for montado no cliente
    window.addEventListener('resize', checkScreen);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreen);
  });

  return { mobile };
}
