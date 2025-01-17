<template>
  <div class="bg-gray-800">
    <div class="absolute top-4 right-4 z-10 w-[500px]">
      <UAlert
        v-if="alert.visible"
        :icon="alert.icon"
        :color="alert.color"
        :title="alert.title"
        :description="alert.description"
        @click="hideAlert"
      />
    </div>
    <slot />
  </div>
</template>
<script setup>
const { alert, hideAlert } = useAlert();
console.log('Estado do alerta no layout:', alert); 
</script>
<!-- #012A35 -->
<!-- #001E26 -->
<!-- #17323A -->