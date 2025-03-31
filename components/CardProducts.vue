<template>
  <div class="scroll-container flex overflow-auto scroll-smooth space-x-4 py-4">
    <div v-for="(product, dx) in products" :key="dx">
      <div
        class="border border-gray-700 bg-gray-800 hover:border-none hover:bg-gray-700 rounded w-[16em] h-[15em] hover:shadow-xl p-2 sm:p-4 flex flex-col justify-around"
        @click="handleEvent(product)"
      >
        <div class="flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center items-center">
            <span class="text-xl font-bold" v-if="product.ticker">{{ product.ticker }}</span>
            <p class="font-bold" :class="{'text-sm': product.ticker, 'text-xl': !product.ticker }">{{ product.name }}</p>
            <p class="text-sm text-white font-bold" :class="{'text-xl text-white': !product.name}">
              <span>{{ product.bank }}</span>
              <span v-if="product.bank"> - {{ formatDate(product.maturityDate) }}</span>
            </p>
          </div>
          <span
            class="text-xs mt-2 border px-2 py-1 rounded-xl flex items-center space-x-1"
            :class="{
              'text-red-300': product.type === 'hight',
              'text-yellow-200': product.type === 'real_estate',
              'text-gray-300': product.type === 'CDB'
            }"
          >
            <LucideChartNoAxesColumnIncreasing class="h-3 w-3"/>
            <p class="text-xs">{{ formatText(product.type) }}</p>
          </span>
        </div>
        <div class="text-xs flex flex-col" v-if="type === 'fixed_income'">
          <div class="flex justify-between">
            <p class="text-gray-400">Característica: </p>
            <p>{{ formatType(product.rateType) }}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-400">Taxa:</p>
            <p>{{ product.interestRate }}%</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-400">Investimento minimo: </p>
            <p>{{ formatNumber(product.minimumInvestment) }}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-400">Liquidez: </p>
            <p>{{ product.liquidity }}</p>
          </div>
        </div>
        <div class="text-xs flex flex-col" v-if="type === 'real_estate'">
          <div class="flex justify-between">
            <p class="text-gray-400">Categoria: </p>
            <p>{{ product.category }}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-400">Dividend Yield:</p>
            <p>{{ product.dividendYield }}%</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-400">Último dividendo: </p>
            <p>{{ formatNumber(product.lastDividend) }}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-400">Patrimônio: </p>
            <p>{{ formatCurrency(product.netWorth) }}</p>
          </div>
        </div>
        <div class="mx-auto">
          <button class="text-sm text-black font-bold py-1 px-8 rounded-2xl bg-primary">Investir</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    products: Array,
    type: String
  })
  const emit = defineEmits(['handleClick'])
  const { formatText, formatCurrency, formatNumber, formatType, formatDate } = useFormat();
  
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