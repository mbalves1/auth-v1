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
        <div
          class="z-40 h-screen p-2 pt-4 overflow-y-auto transition-all duration-300 ease-in-out w-20 dark:bg-gray-900 flex flex-col items-center justify-between"
          :class="{ 'w-[170px] p-4': openMenu }">
          <p @click="open" class="inline-block border rounded p-1"><LucideWalletMinimal /></p>
          <nav class="space-y-2">
            <ul v-for="(nav, i) in navs" :key="i" class="hover:bg-gray-800 hover:text-primary rounded cursor-pointer">
              <li
                @click="goTo(nav.path, i)"
                class="flex items-center p-2 space-x-2 rounded"
                :class="{ 'bg-gray-800 text-primary': activeIndex === i }">
                <LucideHouse v-if="nav.icon === 'LucideHouse'"></LucideHouse>
                <LucideLayoutDashboard v-if="nav.icon === 'LucideLayoutDashboard'"></LucideLayoutDashboard>
                <LucideSheet v-if="nav.icon === 'LucideSheet'"></LucideSheet>
                <LucideArrowRightLeft v-if="nav.icon === 'LucideArrowRightLeft'"></LucideArrowRightLeft>
                <LucideUserRoundPen v-if="nav.icon === 'LucideUserRoundPen'"></LucideUserRoundPen>
                <transition name="fade">
                  <div v-show="openMenu">
                    {{ nav.name }}
                  </div>
                </transition>
              </li>
            </ul>
          </nav>
          <p class="h-[300px]"></p>
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
  const activeIndex = ref(null)
  const navs = ref([
    { name: 'Home', path: '/home', icon: 'LucideHouse' },
    { name: 'Dashboard', path: '/dashboard', icon: 'LucideLayoutDashboard' },
    { name: 'Tabelas', path: '/tabelas', icon: 'LucideSheet' },
    { name: 'Transações', path: '/transacoes', icon: 'LucideArrowRightLeft' },
    { name: 'Profile', path: '/profile', icon: 'LucideUserRoundPen' },
  ])

  function open() {
    return openMenu.value = !openMenu.value
  }

  function goTo(params, index) {
    activeIndex.value = index
    router.push(params);
  }
</script>
<style>
.fade-enter-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
<!-- #012A35 -->
<!-- #001E26 -->
<!-- #17323A -->