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

    <!-- <transition name="slide-fade" mode="out-in"> -->

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

      <div v-else class="mt-10">
        <div class="my-4">
          <h1 class="text-xl">Simulação</h1>
          <p class="text-xs">Caso seja interessante clique aqui e seguimos com o contrato</p>
          <p class="text-xs">Caso deseje alterar o valor do investimento clique aqui increase decrease</p>
        </div>
        <div class="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-4 mt-4">
          <div v-if="dataSimulateWallet.fixed_income.value">
            <div>
              {{dataSimulateWallet.fixed_income.offer.name}} - 
              {{dataSimulateWallet.fixed_income.offer.issuer}}
            </div>
            <div>
              {{formatCurrency(dataSimulateWallet.fixed_income.value)}}
            </div>

            <CardProductsContentFixedIncome
              :product="dataSimulateWallet.fixed_income.offer"
            >
            </CardProductsContentFixedIncome>
          </div>

          <div v-if="dataSimulateWallet.real_state_funds.value">
            <div>
              {{dataSimulateWallet.real_state_funds.offer.name}} - 
              {{dataSimulateWallet.real_state_funds.offer.issuer}}
            </div>
            <div>
              {{formatCurrency(dataSimulateWallet.real_state_funds.value)}}
            </div>
            <CardProductsContentRealEstate
              :product="dataSimulateWallet.real_state_funds.offer"
            >
            </CardProductsContentRealEstate>

          </div>

          <div v-if="dataSimulateWallet.stocks.value">
            <div>
              {{dataSimulateWallet.stocks.offer.name}} - 
              {{dataSimulateWallet.stocks.offer.ticker}}
            </div>
            <div>
              {{formatCurrency(dataSimulateWallet.stocks.value)}}
            </div>
            <CardProductsContentStocks
              :product="dataSimulateWallet.stocks.offer"
            >
            </CardProductsContentStocks>

          </div>

          <div v-if="dataSimulateWallet.productsCrypto.value">
            <div>
              {{dataSimulateWallet.productsCrypto.offer.name}} - 
              {{dataSimulateWallet.productsCrypto.offer.symbol}}
            </div>
            <div>
              {{formatCurrency(dataSimulateWallet.productsCrypto.value)}}
            </div>
            <CardProductsContentStocks
              :product="dataSimulateWallet.productsCrypto.offer"
            >
            </CardProductsContentStocks>

          </div>
        </div>


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
    <!-- </transition> -->
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

  const { formatText, formatCurrency, formatNumber, formatType, formatDate } = useFormat();

  const main = ref(true)
  const token = ref(null)
  const fixedIncomeSimulate = ref(null)

  const filterProductsByType = (type) => {
    return dataProducts.value.filter(({ investmentType }) => investmentType === type);
  };

  const getFixedIncomeTeste = (response) => {
    console.log('response', response?.fixed_income?.offer);
    
    fixedIncomeSimulate.value = response?.fixed_income?.offer;
    return fixedIncomeSimulate.value
  }

  onMounted( async () => {
    await fetchProducts()

    await nextTick();
    token.value = useCookie('auth_token');
  })

  const selectedProduct = (product) => {
    console.log('Product clicked:', product);
  }

  const formatDataSimulateWallet = () => {
    console.log('dataSimulateWallet', dataSimulateWallet.value);
  }

  async function simulate() {
    main.value = !main.value
    try {
      const wallet = await getSimulateWallet(token.value);
      console.log('>>>>', wallet);
      getFixedIncomeTeste(wallet)
      return wallet
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProducts() {
    try {
      await Promise.all([
        getProducts(),
        getFixedIncome(),
        getRealEstate(),
        getProductsStocks(),
        getProductsCrypto(),
      ]);
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
