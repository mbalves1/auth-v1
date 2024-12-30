<template>
  <label :for="forProps" class="block mb-2 text-sm font-medium text-[#cbcccf]">
    <slot />
  </label>
</template>
<script setup>
defineProps({
  forProps: {
    type: String,
  }
})
</script>