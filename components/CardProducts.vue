<template>
  <div
    class="scroll-container flex overflow-auto scroll-smooth py-4"
    :class="tableView
      ? 'flex flex-wrap gap-4'
      : 'flex space-x-2'"
  >
    <div v-for="(product, dx) in products" :key="dx">
      <div
        class="border border-gray-700 bg-gray-800 hover:border-none hover:bg-gray-700 rounded w-[16em] h-[15em] hover:shadow-xl p-2 sm:p-4 flex flex-col justify-around"
      >
        <div class="flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center items-center">
            <span class="text-xl font-bold" v-if="product.ticker">{{ product.ticker }}</span>
            <p v-if="product.symbol" class="font-bold text-xl">{{ product.symbol }}</p>
            <p class="font-bold" :class="[
              (product.ticker || product.symbol) ? 'text-sm' : 'text-xl'
            ]">{{ product.name }}</p>
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
          <CardProductsContentFixedIncome
            :product="product"
          >
          </CardProductsContentFixedIncome>
        </div>
        <div class="text-xs flex flex-col" v-if="type === 'real_estate'">
          <CardProductsContentRealEstate
            :product="product"
          >
          </CardProductsContentRealEstate>
        </div>
        <div class="text-xs flex flex-col" v-if="type === 'stocks'">
          <CardProductsContentStocks
            :product="product"
          >
          </CardProductsContentStocks>
        </div>
        <div class="text-xs flex flex-col" v-if="type === 'crypto'">
          <CardProductsContentCrypto
            :product="product"
          >
          </CardProductsContentCrypto>
        </div>

        <div v-if="type === 'fixed_income' && visibleInputIndex === dx" class="flex flex-col justify-center items-center my-2">
          <input 
            class="w-1/2 text-center bg-gray-500 rounded-lg" 
            type="text" 
            placeholder="R$ 0,00"
            v-model="investmentAmounts[dx]"
            @click.stop
            @input="formatInputValue(dx)"
          />
            <!-- @input="formatInputValue(dx)" -->
        </div>

        <div class="mx-auto">
          <button
            v-if="type === 'fixed_income' && visibleInputIndex !== dx"
            class="text-sm text-black font-bold py-1 px-8 rounded-2xl bg-primary"
            @click.stop="toggleInput(dx)"
          >Investir</button>

          <button
            v-else
            class="text-sm text-black font-bold py-1 px-8 rounded-2xl bg-primary"
            @click.stop="handleEvent(product, dx)"
          >Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    products: Array || Object,
    type: String,
    tableView: Boolean
  })
  const emit = defineEmits(['handleClick'])
  const { formatText, formatCurrency, formatNumber, formatType, formatDate } = useFormat();
  
  const scrollContainers = [ref(null), ref(null), ref(null)]; 
  const visibleInputIndex = ref(null);
  const investmentAmounts = reactive({});
  const amount = reactive({});

  // Função para formatar o valor como moeda
  const formatInputValue = (index) => {
    // Remove qualquer caractere que não seja número
    let value = investmentAmounts[index].replace(/\D/g, '');
    
    // Se estiver vazio, não faz nada
    if (!value) {
      investmentAmounts[index] = '';
      return;
    }
    
    // Converte para número e divide por 100 para obter os centavos
    const numValue = parseInt(value) / 100;
    
    // Formata como moeda (R$)
    investmentAmounts[index] = `R$ ${numValue.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;

    amount.value = numValue;
  };

  onMounted( async () => {
    await nextTick();
    scrollContainers.value = document.querySelectorAll('.scroll-container');

    scrollContainers.value.forEach((container) => {
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

  const handleEvent = (product, dx) => {
    const object = {
      product,
      amount: amount.value
    }

    emit('handleClick', object);
  }

  const toggleInput = (index) => {
    // Se clicar no mesmo item novamente, fecha o input
    if (visibleInputIndex.value === index) {
      visibleInputIndex.value = null;
    } else {
      // Caso contrário, abre o input para este item
      visibleInputIndex.value = index;
    }
  };

</script>