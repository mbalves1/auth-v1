<template>
  <div>
    <div class="flex justify-between">
      <p class="text-gray-400">Categoria: </p>
      <p>{{ product.category }}</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">Dividend Yield:</p>
      <p>{{ product.dividendYield }}%</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">Último dividendo: </p>
      <p>{{ formatNumber(product.lastDividend) }}</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">Patrimônio: </p>
      <p>{{ formatCurrency(product.netWorth) }}</p>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    product: Array
  })

  const { formatText, formatCurrency, formatNumber, formatType, formatDate } = useFormat();
  
</script>