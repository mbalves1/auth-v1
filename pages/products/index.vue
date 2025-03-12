<template>
  <div>
    <div>Products</div>

    <div class="flex space-x-5">
      <button @click="fecthProducts" class="p-2 bg-green-200 text-black">
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
	const { getProducts, product } = useProductStore();

  const dataProducts = ref([])

  onMounted( async () => {
    await fecthProducts()
  })

  async function fecthProducts() {
    try {
      await getProducts()
      
      dataProducts.value = product
      console.log('>>', product);
    } catch (error) {
      console.error(error);
    }
  }
</script>