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
        <button class="w-[200px] bg-primary text-black font-bold p-3 rounded-lg" @click="simulate">Simular</button>
      </div>
    </div>

    <transition name="slide-fade" mode="out-in">

      <div v-if="main">
        <!-- Line 1  -->
        <h2 class="text-2xl font-bold text-primary-300 mt-10 mb-2">Renda Fixa</h2>
        <CardProducts
          class="scroll-container"
          :products="dataFixedIncomeProducts"
          type="fixed_income"
          @handleClick="selectedProduct"
        />

        <!-- Line 2  real_estate_funds -->
        <h2 class="text-2xl font-bold text-primary-300 mt-10 mb-2">Fundos Imobiliários</h2>
        <CardProducts
          class="scroll-container"
          :products="dataRealEstateProducts"
          type="real_estate"
          @handleClick="selectedProduct"
        />

        <!-- Line 3 stocks -->
        <h2 class="text-2xl font-bold text-primary-300 mt-10 mb-2">Ações</h2>
        <CardProducts
          class="scroll-container"
          :products="dataStocksProducts"
          type="stocks"
          @handleClick="selectedProduct"
        />

        <!-- Line 4 crypto -->
        <h2 class="text-2xl font-bold text-primary-300 mt-10 mb-2">Crypto</h2>
        <CardProducts
          class="scroll-container"
          :products="dataCryptProducts"
          type="crypto"
          @handleClick="selectedProduct"
        />
      </div>

      <div v-else>
        <CardProducts
          class="scroll-container"
          :products="dataSimulateWallet.fixed_income"
          type="fixed_income"
        />

        <CardProducts
          class="scroll-container"
          :products="dataSimulateWallet.real_state_funds"
          type="real_estate"
        />

        <!-- <CardProducts
          class="scroll-container"
          :products="dataSimulateWallet.stocks"
          type="real_estate"
        />

        <CardProducts
          class="scroll-container"
          :products="dataSimulateWallet.productsCrypto"
          type="real_estate"
        /> -->
      </div>
    </transition>
  </div>
</template>
<script setup>
  const storeProduct = useProductStore();
  const storeSimulate = useSimulateStore();
  const {
    product,
    fixedIncomeProducts,
    realEstateProducts,
    stocksProducts,
    cryptProducts
  } = storeToRefs(storeProduct);
  const { simulateWallet } = storeToRefs(storeSimulate);

	const {
    getProducts,
    getFixedIncome,
    getRealEstate,
    getProductsStocks,
    getProductsCrypto
  } = useProductStore();
	const { getSimulateWallet } = useSimulateStore();

  const dataProducts = computed(() => product.value);
  const dataFixedIncomeProducts = computed(() => fixedIncomeProducts.value);
  const dataRealEstateProducts = computed(() => realEstateProducts.value);
  const dataStocksProducts = computed(() => stocksProducts.value);
  const dataCryptProducts = computed(() => cryptProducts.value);
  const dataSimulateWallet = computed(() => simulateWallet.value);

  const main = ref(true)

  const token = ref(null)

  const filterProductsByType = (type) => {
    return dataProducts.value.filter(({ investmentType }) => investmentType === type);
  };

  onMounted( async () => {
    await fetchProducts()

    await nextTick();
    token.value = useCookie('auth_token');
  })

  const selectedProduct = (product) => {
    console.log('Product clicked:', product);
  }

  async function simulate() {
    main.value = !main.value
    try {
      const wallet = await getSimulateWallet(token.value);
      console.log('>>>>', wallet);
      return wallet
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProducts() {
    try {
      await getProducts();
      await getFixedIncome();
      await getRealEstate();
      await getProductsStocks();
      await getProductsCrypto();
    } catch (error) {
      console.error(error);
    }
  }
</script>
<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}

.slide-fade-enter-from {
	opacity: 0;
	transform: translateX(20px);
}

.slide-fade-leave-to {
	opacity: 0;
	transform: translateX(20px);
}
</style>
