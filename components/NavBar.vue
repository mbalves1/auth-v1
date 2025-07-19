<template>
  <nav class="space-y-2">
    <ul v-for="(nav, i) in navs" :key="i" class="hover:bg-gray-800 hover:text-primary rounded cursor-pointer">
      <li
        @click="goTo(nav.path, i)"
        class="flex items-center p-2 space-x-2 rounded w-[150px]"
        :class="{ 'bg-gray-800 text-primary': activeIndex === i, 'w-full': !openMenu }">
        <LucideHouse v-if="nav.icon === 'LucideHouse'" size="18" />
        <LucideLayoutDashboard v-if="nav.icon === 'LucideLayoutDashboard'" size="18" />
        <LucideSheet v-if="nav.icon === 'LucideSheet'" size="18" />
        <LucideGem v-if="nav.icon === 'LucideGem'" size="18" />
        <LucideArrowRightLeft v-if="nav.icon === 'LucideArrowRightLeft'" size="18" />
        <LucideUserRoundPen v-if="nav.icon === 'LucideUserRoundPen'" size="18" />
        <transition name="fade">
          <div v-show="openMenu" class="text-sm">
            {{ nav.name }}
          </div>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const router = useRouter();

const props = defineProps({
  openMenu: Boolean
})

const activeIndex = ref(0)
const navs = ref([
  { name: 'Home', path: '/home', icon: 'LucideHouse' },
  { name: 'Dashboard', path: '/dashboard', icon: 'LucideLayoutDashboard' },
  { name: 'Tabelas', path: '/tables', icon: 'LucideSheet' },
  { name: 'Investir', path: '/products', icon: 'LucideGem' },
  { name: 'Transações', path: '/transactions', icon: 'LucideArrowRightLeft' },
  { name: 'Profile', path: '/profile', icon: 'LucideUserRoundPen' },
])

function goTo(params, index) {
  activeIndex.value = index
  router.push(params);
}
</script>

<style scoped>
</style>
