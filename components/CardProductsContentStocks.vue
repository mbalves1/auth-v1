<template>
  <div>
    <div class="flex justify-between">
      <p class="text-gray-400">Setor: </p>
      <p>{{ product.sector }}</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">Dividend Yield:</p>
      <p>{{ product.dividendYield }}%</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">Último Preço: </p>
      <p>{{ formatCurrency(product.lastPrice) }}</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">MarketCap: </p>
      <p>{{ formatNumber(product.marketCap) }}</p>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    product: Array
  })

  const { formatText, formatCurrency, formatNumber, formatType, formatDate } = useFormat();
  
</script>