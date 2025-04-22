<template>
  <div class="flex flex-col">
    <header class="flex justify-between items-center bg-gray-800 text-white p-4 sm:w-[500px] mx-auto">
      <h1>menu rapido</h1>
      <div>item</div>
      <div>Selecao</div>
    </header>
    <main class="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 sm:m-5 items-center">
      <div v-for="(item, index) in dataUserInvestment" :key="index" class="flex">
        <div class="border border-gray-700 rounded p-5 w-[250px] ">
          <div class="flex justify-between items-center">
            <div>
              {{ extractInvestmentInfo(item).type }}
            </div>
            <div class="text-xs" v-if="extractInvestmentInfo(item).maturityDate">
              {{ extractInvestmentInfo(item).maturityDate }}
            </div>
            <div>
              {{ formatCurrency(extractInvestmentInfo(item).investedAmount) }}
            </div>
          </div>
          <p>{{ extractInvestmentInfo(item).name }}</p>
          <p>{{ extractInvestmentInfo(item).issuer }}</p>
          <p>{{ extractInvestmentInfo(item).ticker }}</p>

        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"]
});

  const { formatCurrency, formatDate } = useFormat();

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

const storeInvestment = useInvestmentStore();
const { userInvestments } = storeToRefs(storeInvestment);
const { getUserInvestment } = useInvestmentStore();

const dataUserInvestment = computed(() => userInvestments.value);

const token = ref(null)

onMounted(async () => {
  token.value = useCookie('auth_token');
  await getUserInvestment(token.value);
});

async function logout() {
  try {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    router.push("/");
  } catch (error) {
    console.error(error.message);
  }
}

// função de formatacao de valor
function extractInvestmentInfo(item) {
  console.log(item);
  
  if (item.RealEstateFund) {
    return {
      type: 'FII',
      name: item.RealEstateFund.name,
      ticker: item.RealEstateFund.ticker,
      investedAmount: item.investedAmount
    }
  }
  if (item.FixedIncomeInvestment) {
    return {
      type: 'Renda Fixa',
      name: item.FixedIncomeInvestment.name,
      issuer: item.FixedIncomeInvestment.issuer,
      investedAmount: item.investedAmount,
      maturityDate: formatDate(item.FixedIncomeInvestment.maturityDate)
    }
  }
  if (item.Stock) {
    return {
      type: 'Açao',
      name: item.Stock.name,
      ticker: item.Stock.ticker,
      investedAmount: item.investedAmount
    }
  }
  return null;
}
</script>