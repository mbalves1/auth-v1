<template>
  <div class="scroll-container flex overflow-auto scroll-smooth space-x-4 py-4">
    <div v-for="(product, dx) in products" :key="dx">
      <div
        class="border border-gray-700 bg-gray-800 hover:border-none hover:bg-gray-700 rounded w-[16em] h-[15em] hover:shadow-xl"
        @click="handleEvent(product)"
      >
        <div>
          <p>{{ product.name }}</p>
          <p>{{ product.bank }}</p>
        </div>
        <div>
          {{ product.rateType }}
          {{ product.rate }}
          {{ product.initialInvestment }}
          {{ product.quantityRemaining }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    products: Array,
  })
  const emit = defineEmits(['handleClick'])
  
  const scrollContainers = [ref(null), ref(null), ref(null)]; 

  onMounted( async () => {
    await nextTick();
    scrollContainers.value = document.querySelectorAll('.scroll-container');

    scrollContainers.value.forEach((container) => {
      console.log(scrollContainers.value);
      
      container.addEventListener('wheel', (event) => {
        if (container.scrollWidth > container.clientWidth) {
          event.preventDefault();
          container.scrollLeft += event.deltaY;
        }
      }, { passive: false });

      // Variáveis para armazenar posição do mouse e scroll
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener('mousedown', (event) => {
        isDown = true;
        startX = event.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing'; // Feedback visual
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
      });

      container.addEventListener('mousemove', (event) => {
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Multiplicador para ajustar a velocidade
        container.scrollLeft = scrollLeft - walk;
      });

      // Aplica estilo inicial para indicar que pode arrastar
      container.style.cursor = 'grab';
    });
  })

  const handleEvent = (product) => {
    emit('handleClick', product);
  }
</script>