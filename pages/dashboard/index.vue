<template>
  <div>
    ola
    {{ dataUserInvestment }}
  </div>
</template>
<script setup>
  const storeInvestment = useInvestmentStore();
  const { userInvestments } = storeToRefs(storeInvestment);
  const { getUserInvestment } = useInvestmentStore();

  const dataUserInvestment = computed(() => userInvestments.value);

  const token = ref(null)

  onMounted(async () => {
    token.value = useCookie('auth_token');
    await getUserInvestment(token.value);
  });
</script>