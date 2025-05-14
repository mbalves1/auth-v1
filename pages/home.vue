<template>
  <div class="flex flex-col">
    <header class="flex flex-col border-b items-start bg-gray-800 text-white p-4 sm:w-[500px]">
      <div class="flex space-x-2">
        <h1>menu rapido</h1>
        <div>item</div>
        <div>Selecao</div>

      </div>
      <div class="flex flex-col">
        <div>Total: 1000</div>
      </div>

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
    <div>
      <!-- <div class="w-full">
        <LineChart
          :data="data"
          :categories="categories"
          :height="300"
          :xFormatter="xFormatter"
          xLabel="Month"
          yLabel="Amount"
        />
      </div> -->

      <div>
        <DonutChart
          :data="DonutData.map((i) => i.value)"
          :height="275"
          :labels="DonutData"
          :hide-legend="true"
          :radius="0"
        >
          <div class="absolute text-center">
            <div class="font-semibold">Label</div>
            <div class="text-(--ui-text-muted)">2 seconds ago</div>
          </div>
        </DonutChart>
      </div>
    </div>
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

// import { LineChart } from 'vue-chrts';

const data = [
  { month: 'Jan', sales: 100, profit: 50 },
  { month: 'Feb', sales: 120, profit: 55 },
  { month: 'Mar', sales: 180, profit: 80 },
  { month: 'Apr', sales: 110, profit: 40 },
  { month: 'May', sales: 90, profit: 30 },
];

const categories = {
  sales: {
    name: 'Sales',
    color: '#3b82f6'
  },
  profit: {
    name: 'Profit', 
    color: '#10b981'
  }
};

const xFormatter = (i) => data[i].month;

const DonutData = [
  {
    color: '#60A5FA',
    name: 'Blue',
    value: 50,
  },
  {
    color: '#CBD5E1',
    name: 'Gray',
    value: 20,
  },
  {
    color: '#05df72',
    name: 'Green',
    value: 30,
  },
]
</script>