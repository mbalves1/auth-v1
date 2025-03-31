<template>
  <div class="h-screen overflow-y-auto p-4">
    <div class="flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-8 justify-between items-center mr-3 mt-5 sm:mt-0">
      <div class="flex overflow-x-auto">
        <div class="bg-gray-900 px-6 py-2 ml-5 rounded-lg flex flex-col w-[150px]">
          <div>
            80% sd olsmd
          </div>
          <div>
            saf sd sdfd
          </div>
        </div>
        <div class="bg-gray-900 px-6 py-2 ml-5 rounded-lg flex flex-col">
            <div>
              80% sd olsmd
            </div>
          <div>
            saf sd sdfd
          </div>
        </div>
        <div class="bg-gray-900 px-6 py-2 ml-5 rounded-lg flex flex-col">
          <div>
            80% sd olsmd
          </div>
          <div>
            saf sd sdfd
          </div>
        </div>
      </div>
      <div class="mr-3">
        <button class="w-[200px] bg-primary text-black font-bold p-3 rounded-lg">Simular</button>
      </div>
    </div>

    <!-- Line 1  -->
    <h2 class="text-2xl font-bold text-primary-300 mt-10 mb-2">Fixed Income</h2>
    <CardProducts
      class="scroll-container"
      :products="dataFixedIncomeProducts"
      type="fixed_income"
      @handleClick="selectedProduct"
    />

    <!-- Line 2  real_estate_funds -->
    <h2 class="text-2xl font-bold text-primary-300 mt-10 mb-2">Real Estate</h2>
    <CardProducts
      class="scroll-container"
      :products="dataRealEstateProducts"
      type="real_estate"
      @handleClick="selectedProduct"
    />

    <!-- Line 3 stocks -->
    <h2 class="text-2xl font-bold text-primary-300 mt-10 mb-2">Stocks</h2>
    <CardProducts
      class="scroll-container"
      :products="filterProductsByType('stocks')"
      @handleClick="selectedProduct"
    />

    <!-- Line 4 crypto -->
    <h2 class="text-2xl font-bold text-primary-300 mt-10 mb-2">Crypto</h2>
    <CardProducts
      class="scroll-container"
      :products="filterProductsByType('crypto')"
      @handleClick="selectedProduct"
    />

  </div>
</template>
<script setup>
  const store = useProductStore();
  const { product, fixedIncomeProducts, realEstateProducts } = storeToRefs(store);

	const { getProducts, getFixedIncome, getRealEstate } = useProductStore();

  const dataProducts = computed(() => product.value);
  const dataFixedIncomeProducts = computed(() => fixedIncomeProducts.value);
  const dataRealEstateProducts = computed(() => realEstateProducts.value);

  const filterProductsByType = (type) => {
    return dataProducts.value.filter(({ investmentType }) => investmentType === type);
  };

  onMounted( async () => {
    await fetchProducts()

    await nextTick();
  })

  const selectedProduct = (product) => {
    console.log('Product clicked:', product);
  }

  async function fetchProducts() {
    try {
      await getProducts();
      await getFixedIncome();
      await getRealEstate();
    } catch (error) {
      console.error(error);
    }
  }
</script>