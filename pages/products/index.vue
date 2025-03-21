<template>
  <div class="h-screen py-4 px-4 overflow-y-auto">
    <div> 
      <div class="h-[6em]">Products</div>
    </div>

    <div class="border border-bottom bg-black my-5"></div>

    <!-- Line 1  -->
    <h2 class="text-2xl font-bold text-gray-200 mt-10 mb-2">Fixed Income</h2>
    <CardProducts
      class="scroll-container"
      :products="filterProductsByType('fixed_income')"
      @handleClick="selectedProduct"
    />

    <!-- Line 2  real_estate_funds -->
    <h2 class="text-2xl font-bold text-gray-200 mt-10 mb-2">Real Estate</h2>
    <CardProducts
      class="scroll-container"
      :products="filterProductsByType('real_estate_funds')"
      @handleClick="selectedProduct"
    />

    <!-- Line 3 stocks -->
    <h2 class="text-2xl font-bold text-gray-200 mt-10 mb-2">Stocks</h2>
    <CardProducts
      class="scroll-container"
      :products="filterProductsByType('stocks')"
      @handleClick="selectedProduct"
    />

    <!-- Line 4 crypto -->
    <h2 class="text-2xl font-bold text-gray-200 mt-10 mb-2">Crypto</h2>
    <CardProducts
      class="scroll-container"
      :products="filterProductsByType('crypto')"
      @handleClick="selectedProduct"
    />

  </div>
</template>
<script setup>
  const store = useProductStore();
  const { product } = storeToRefs(store);

	const { getProducts } = useProductStore();

  const dataProducts = computed(() => product.value);

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
      await getProducts()
    } catch (error) {
      console.error(error);
    }
  }
</script>