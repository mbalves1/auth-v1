<template>
  <div>
    <div>Products</div>

    <div class="flex space-x-5">
      <button @click="fetchProducts" class="p-2 bg-green-200 text-black">
        Produtos
      </button>
      <button class="p-2 bg-green-200 text-black">
        Simular
      </button>
    </div>

    <div v-for="(data, dx) in dataProducts" :key="dx">
      <div class="border">
        {{ data }}
      </div>
    </div>
  </div>
</template>
<script setup>
  const store = useProductStore();
  const { product } = storeToRefs(store);

	const { getProducts } = useProductStore();

  const dataProducts = computed(() => product.value);

  onMounted( async () => {
    await fetchProducts()
  })

  async function fetchProducts() {
    try {
      await getProducts()
    } catch (error) {
      console.error(error);
    }
  }
</script>