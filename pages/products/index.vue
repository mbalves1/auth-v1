<template>
  <div class="h-screen py-4 px-4">
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

    <!-- Line 1  -->
    <div class="scroll-container flex overflow-auto scroll-smooth space-x-4 py-4">
      <div v-for="({name, bank, rateType, rate, initialInvestment, quantityRemaining}, dx) in dataProducts.filter(({investmentType}) => investmentType	 === 'fixed_income')" :key="dx">
        <div class="border border-gray-700 rounded w-[16em] h-[15em]">
          <div>
            <p>{{ name }}</p>
            <p>{{ bank }}</p>
          </div>
          <div>
            {{ rateType }}
            {{ rate }}
            {{ initialInvestment }}
            {{ quantityRemaining }}
          </div>
        </div>
      </div>
    </div>

    <!-- Line 3  -->
    <div class="scroll-container flex overflow-x-auto scroll-smooth space-x-4 py-4">
      <div v-for="({name, bank, rateType, rate, initialInvestment, quantityRemaining}, dx) in dataProducts.filter(({investmentType}) => investmentType	 === 'real_estate_funds')" :key="dx">
        <div class="border border-gray-700 rounded w-[16em] h-[15em]">
          <div>
            <p>{{ name }}</p>
            <p>{{ bank }}</p>
          </div>
          <div>
            {{ rateType }}
            {{ rate }}
            {{ initialInvestment }}
            {{ quantityRemaining }}
          </div>
        </div>
      </div>
    </div>

    <!-- Line 3 -->
    <div class="scroll-container flex overflow-x-auto scroll-smooth space-x-4 py-4">
      <div v-for="({name, bank, rateType, rate, initialInvestment, quantityRemaining}, dx) in dataProducts.filter(({investmentType}) => investmentType	 === 'stocks')" :key="dx">
        <div class="border border-gray-700 rounded w-[16em] h-[15em]">
          <div>
            <p>{{ name }}</p>
            <p>{{ bank }}</p>
          </div>
          <div>
            {{ rateType }}
            {{ rate }}
            {{ initialInvestment }}
            {{ quantityRemaining }}
          </div>
        </div>
      </div>
    </div>

    <!-- Line 4 -->
    <div class="scroll-container flex overflow-x-auto scroll-smooth space-x-4 py-4">
      <div v-for="({name, bank, rateType, rate, initialInvestment, quantityRemaining}, dx) in dataProducts.filter(({investmentType}) => investmentType	 === 'crypto')" :key="dx">
        <div class="border border-gray-700 rounded w-[16em] h-[15em]">
          <div>
            <p>{{ name }}</p>
            <p>{{ bank }}</p>
          </div>
          <div>
            {{ rateType }}
            {{ rate }}
            {{ initialInvestment }}
            {{ quantityRemaining }}
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
    scrollContainers.value = document.querySelectorAll('.scroll-container');

    // Adiciona o evento de scroll a cada container
    scrollContainers.value.forEach((container) => {
      container.addEventListener('wheel', (event) => {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      });
    });
  })

  async function fetchProducts() {
    try {
      await getProducts()
    } catch (error) {
      console.error(error);
    }
  }
</script>