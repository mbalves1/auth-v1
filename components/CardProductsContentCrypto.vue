<template>
  <div>
   <div class="flex justify-between">
      <p class="text-gray-400">Último Preço: </p>
      <p>{{ formatCurrency(product.lastPrice) }}</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">Circulação:</p>
      <p>{{ formatNumber(product.circulatingSupply) }}</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">MarketCap: </p>
      <p>{{ formatNumber(product.marketCap) }}</p>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    product: Array || Object
  })

  const { formatText, formatCurrency, formatNumber, formatType, formatDate } = useFormat();
  
</script>