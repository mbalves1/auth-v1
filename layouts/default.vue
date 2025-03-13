<template>
  <div class="bg-gray-800 h-screen">
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
    <div
      class="flex flex-col sm:flex-row justify-between"
      :class="{'flex flex-col-reverse h-screen justify-between': mobile}"
    >
      <div v-if="mobile" class="m-4 mb-4 flex items-center justify-center">
        <div class="fixed bottom-4 bg-gray-900 p-2 rounded-lg flex">
          <NavBarMobile />
        </div>
      </div>
      <div v-if="!mobile">
        <div
          class="rounded-r-[10px] z-40 h-screen pt-4 overflow-y-auto transition-all duration-300 ease-in-out w-20 dark:bg-gray-900 flex flex-col items-center justify-between"
          :class="{ 'w-[170px] ': openMenu }">
          <p @click="open" class="inline-block border rounded p-1 border-primary text-primary"><LucideWalletMinimal /></p>
          <NavBar :open-menu="openMenu" />
          <div class="pb-4">
            <button @click="signOut">logout</button>
          </div>
        </div>
      </div>
      <div class="">
        <slot />
      </div>
      <div class="dark:bg-gray-900 sm:w-1/4 p-1">
        <Calendar />
      </div>
    </div>
  </div>
</template>
<script setup>
  const { alert, hideAlert } = useAlert();
  const { mobile } = useMobile();

	const client = useSupabaseClient();
	const router = useRouter();

  const openMenu = ref(true);

  function open() {
    return openMenu.value = !openMenu.value
  }

  async function signOut() {
    await client.auth.signOut(); // Desloga do Supabase
    const token = useCookie('auth_token');
    token.value = null; // Remove o token do cookie
    router.push('/');
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