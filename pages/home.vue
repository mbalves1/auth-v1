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
    <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 sm:m-5 items-center">
      <div v-for="(item, index) in dataUserInvestment" :key="index" class="flex">
        <div class="border border-gray-700 rounded p-5 w-[250px] ">
          <div class="flex justify-between items-center">
            <!-- {{item}} -->
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
    </div>
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
  </div>
    <div class="flex flex-col gap-4 justify-center mx-auto">
      <div class="flex gap-2 w-[700px]">
        <div class="bg-white w-full rounded-lg">asw</div>
        <div class="w-full">
          <DonutChart
          :data="DonutData.map((i) => i.value)"
          :height="200"
          :labels="marketShareLabels"
          :hide-legend="true"
          :radius="0"
        >
          <div class="absolute text-center">
            <div class="font-semibold">Label</div>
            <div class="text-(--ui-text-muted)">2 seconds ago</div>
          </div>
        </DonutChart></div>
      </div>
      <div class="bg-red-500 w-full rounded-lg h-40">ds</div>
      <button class="bg-blue-400" @click="call">Call</button>
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
// console.log('userInvestments', userInvestments.value);

const rendaFixa = ref(0)
const Fii = ref(0)
const stock = ref(0)

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

async function call() {
  await getUserInvestment(token.value);
}

// função de formatacao de valor
function extractInvestmentInfo(item) {
  // console.log(item);
  
  if (item.RealEstateFund) {
    Fii.value = item.investedAmount
    return {
      type: 'FII',
      name: item.RealEstateFund.name,
      ticker: item.RealEstateFund.ticker,
      investedAmount: item.investedAmount
    }
  }
  if (item.FixedIncomeInvestment) {
    rendaFixa.value = item.investedAmount
    console.log('rendaFixa.value', rendaFixa.value);
    
    return {
      type: 'Renda Fixa',
      name: item.FixedIncomeInvestment.name,
      issuer: item.FixedIncomeInvestment.issuer,
      investedAmount: item.investedAmount,
      maturityDate: formatDate(item.FixedIncomeInvestment.maturityDate)
    }
  }
  if (item.Stock) {
    stock.value = item.investedAmount
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

const cpftest = ref();

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

const DonutData = computed(() => [
  {
    color: '#60A5FA',
    name: 'Renda Fixa',
    value: rendaFixa.value,
  },
  {
    color: '#CBD5E1',
    name: 'FII',
    value: Fii.value,
  },
  {
    color: '#05df72',
    name: 'Stocks',
    value: stock.value,
  },
]);

const marketShareLabels = [
  { name: 'Product A', color: '#3b82f6' }, // Blue
  { name: 'Product B', color: '#14b8a6' }, // Teal
  { name: 'Product C', color: '#f59e0b' },
]
</script>