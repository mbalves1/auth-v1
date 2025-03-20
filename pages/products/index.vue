<template>
  <div class="h-screen py-4 px-4 overflow-y-auto">
    <div> 
      <div class="h-[6em]">Products</div>

      <div class="flex space-x-5">
        <button @click="fetchProducts" class="p-2 bg-green-200 text-black">
          Produtos
        </button>
        <button class="p-2 bg-green-200 text-black">
          Simular
        </button>
      </div>
    </div>

    <div class="border border-bottom bg-black my-5"></div>

    <!-- Line 1  -->
    <h2 class="text-2xl font-bold text-gray-200 mt-10 mb-2">Fixed Income</h2>
    <div class="scroll-container flex overflow-auto scroll-smooth space-x-4 py-4">
      <div v-for="(fixedIncome, dx) in dataProducts.filter(({investmentType}) => investmentType	 === 'fixed_income')" :key="dx">
        <div class="border border-gray-700 bg-gray-800 hover:border-none hover:bg-gray-700 rounded w-[16em] h-[15em] hover:shadow-xl" @click="handleClick(fixedIncome)">
          <div>
            <p>{{ fixedIncome.name }}</p>
            <p>{{ fixedIncome.bank }}</p>
          </div>
          <div>
            {{ fixedIncome.rateType }}
            {{ fixedIncome.rate }}
            {{ fixedIncome.initialInvestment }}
            {{ fixedIncome.quantityRemaining }}
          </div>
        </div>
      </div>
    </div>

    <!-- Line 2  -->
    <h2 class="text-2xl font-bold text-gray-200 mt-10 mb-2">Real Estate</h2>
    <div class="scroll-container flex overflow-x-auto scroll-smooth space-x-4 py-4">
      <div v-for="(re, dx) in dataProducts.filter(({investmentType}) => investmentType	 === 'real_estate_funds')" :key="dx">
        <div class="border border-gray-700 bg-gray-800 hover:border-none hover:bg-gray-700 rounded w-[16em] h-[15em]" @click="handleClick(re)">
          <div>
            <p>{{ re.name }}</p>
            <p>{{ re.bank }}</p>
          </div>
          <div>
            {{ re.rateType }}
            {{ re.rate }}
            {{ re.initialInvestment }}
            {{ re.quantityRemaining }}
          </div>
        </div>
      </div>
    </div>

    <!-- Line 3 -->
    <h2 class="text-2xl font-bold text-gray-200 mt-10 mb-2">Stocks</h2>
    <div class="scroll-container flex overflow-x-auto scroll-smooth space-x-4 py-4">
      <div v-for="(stocks, dx) in dataProducts.filter(({investmentType}) => investmentType	 === 'stocks')" :key="dx">
        <div class="border border-gray-700 bg-gray-800 hover:border-none hover:bg-gray-700 rounded w-[16em] h-[15em]">
          <div>
            <p>{{ stocks.name }}</p>
            <p>{{ stocks.bank }}</p>
          </div>
          <div>
            {{ stocks.rateType }}
            {{ stocks.rate }}
            {{ stocks.initialInvestment }}
            {{ stocks.quantityRemaining }}
          </div>
        </div>
      </div>
    </div>

    <!-- Line 4 -->
    <h2 class="text-2xl font-bold text-gray-200 mt-10 mb-2">Crypto</h2>
    <div class="scroll-container flex overflow-x-auto scroll-smooth space-x-4 py-4">
      <div v-for="(crypto, dx) in dataProducts.filter(({investmentType}) => investmentType	 === 'crypto')" :key="dx">
        <div class="border border-gray-700 bg-gray-800 hover:border-none hover:bg-gray-700 rounded w-[16em] h-[15em]">
          <div>
            <p>{{ crypto.name }}</p>
            <p>{{ crypto.bank }}</p>
          </div>
          <div>
            {{ crypto.rateType }}
            {{ crypto.rate }}
            {{ crypto.initialInvestment }}
            {{ crypto.quantityRemaining }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const store = useProductStore();
  const { product } = storeToRefs(store);

  const scrollContainers = [ref(null), ref(null), ref(null)];
	const { getProducts } = useProductStore();

  const dataProducts = computed(() => product.value);

  onMounted( async () => {
    await fetchProducts()

    await nextTick();
    // scrollContainers.value = document.querySelectorAll('.scroll-container');

    // // Adiciona o evento de scroll a cada container
    // scrollContainers.value.forEach((container) => {
    //   container.addEventListener('wheel', (event) => {
    //     event.preventDefault();
    //     container.scrollLeft += event.deltaY;
    //   });
    // });
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

  const handleClick = (product) => {
    console.log('Product clicked:', product);
  }

  async function fetchProducts() {
    try {
      await getProducts()
    } catch (error) {
      console.error(error);
    }
  }
</script>