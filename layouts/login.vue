<template>
  <div class="bg-gray-800">
    <div class="absolute top-4 right-4 z-10 w-[500px]">
      <UAlert
        v-if="alert.visible"
        :title="alert.title"
        :description="alert.description"
        :icon="alert.icon">
        <template #icon="{ icon }">
          <UBadge size="sm" :color="alert.color">
            <UIcon :name="icon" />
          </UBadge>
        </template>
      </UAlert>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
<script setup>
  const { alert, hideAlert } = useAlert();
  const router = useRouter();

  function goTo(params) {
    router.push(params);
  }
</script>
<!-- #012A35 -->
<!-- #001E26 -->
<!-- #17323A -->