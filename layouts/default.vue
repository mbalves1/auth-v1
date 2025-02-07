<template>
  <div class="bg-gray-800">
    <div class="absolute top-4 right-4 z-10 w-[500px]">
      <!-- <UAlert
        v-if="alert.visible"
        :icon="alert.icon"
        :color="alert.color"
        :title="alert.title"
        :description="alert.description"
        @click="hideAlert"
      /> -->
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
    <div class="flex">
      <div>
        <div class="z-40 h-screen p-2 pt-4 overflow-y-auto transition-all duration-300 ease-in-out w-20 dark:bg-gray-900" :class="{ 'w-60 p-4': openMenu }">
          <p @click="open" class="inline-block border rounded p-1">MyApp</p>
          <nav>
            <ul>
              <li @click="goTo('/home')">Home</li>
              <li @click="goTo('/dashboard')">Dashboard</li>
              <li>Tabelas</li>
              <li>Transações</li>
              <li>Profile</li>
            </ul>
          </nav>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup>
  const { alert, hideAlert } = useAlert();
  const router = useRouter();

  const openMenu = ref(true);

  function open() {
    return openMenu.value = !openMenu.value
  }

  function goTo(params) {
    router.push(params);
  }
</script>
<!-- #012A35 -->
<!-- #001E26 -->
<!-- #17323A -->