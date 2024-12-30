<template>
  <div
    class="bg-gray-900 dark:bg-gray-800 border-2 px-4 py-3 rounded-xl relative shadow-custom"
    :class="notification.colorBorder"
    role="alert"
    >
    <strong class="font-bold">{{ notification.title }}</strong>
    <span class="block sm:inline">{{ notification.message }}</span>
  </div>
</template>
<script setup>
defineProps({
  notification: Object
})

</script>