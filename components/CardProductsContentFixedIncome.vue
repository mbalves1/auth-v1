<template>
  <div>
    <div class="flex justify-between">
      <p class="text-gray-400">Característica: </p>
      <p>{{ formatType(product.rateType) }}</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">Taxa:</p>
      <p>{{ product.interestRate }}%</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">Investimento minimo: </p>
      <p>{{ formatNumber(product.minimumInvestment) }}</p>
    </div>
    <div class="flex justify-between">
      <p class="text-gray-400">Liquidez: </p>
      <p>{{ product.liquidity }}</p>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    product: Array || Object
  })

  const { formatText, formatCurrency, formatNumber, formatType, formatDate } = useFormat();
  
</script>