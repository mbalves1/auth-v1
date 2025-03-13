<template>
  <ul class="flex space-x-3 items-center">
    <li 
      v-for="(item, index) in navItems" 
      :key="index"
      :class="[
        'p-2 rounded-full transition-colors duration-300',
        activeIndex === index ? 'bg-gray-700 text-primary' : 'text-gray-200'
      ]"
      @click="goTo(item.route, index)"
    >
      <component :is="item.icon" size="20" />
    </li>
  </ul>
</template>

<script setup>
import { 
  LucideHouse, 
  LucideLayoutDashboard, 
  LucideSheet, 
  LucideGem, 
  LucideArrowRightLeft, 
  LucideUserRoundPen 
} from 'lucide-vue-next';

// Ícones e rotas
const navItems = [
  { icon: LucideHouse, route: '/home' },
  { icon: LucideLayoutDashboard, route: '/dashboard' },
  { icon: LucideSheet, route: '/tables' },
  { icon: LucideGem, route: '/products' },
  { icon: LucideArrowRightLeft, route: '/transactions' },
  { icon: LucideUserRoundPen, route: '/profile' },
];

const router = useRouter();
const activeIndex = ref(0);

function goTo(route, index) {
  activeIndex.value = index;
  router.push(route);
}
</script>
