<template>
  <div>
      <!---->
    <form class="flex flex-col">
      <div class="pb-2">
        <Label for="email">Email</Label>
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
            <LucideMail />
          </span>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="name@company.com"
            autocomplete="off"
            v-model="email"
          />
        </div>
        <div v-if="success" class="flex justify-end text-green-500 text-sm">
          <span>Email sent check your inbox</span>
        </div>
        <div>{{ errorMsg }}</div>
      </div>
      <div
        class="flex justify-end items-center text-gray-500 underline text-sm space-x-2 pb-2 font-bold cursor-pointer"
        @click="goToLoginPage"
      >
        <LucideArrowLeft class="h-3 w-3"></LucideArrowLeft>
        back to login page
      </div>
      <Button
        title="Send email"
        :loading="loading"
        @clickCustom="sendEmailVerification()"
      ></Button>
      <div
        class="text-sm font-light text-[#6B7280]"
      >Don't have an accout yet? <a href="/register" class="font-medium text-primary hover:underline">Sign Up</a>

      </div>
    </form>
  </div>
</template>
<script setup>
  const emit = defineEmits(['goBackLogin']);

  const client = useSupabaseClient();
  const router = useRouter();
  const success = ref(false);
	const loading = ref(false);

  const email = ref('');
  const errorMsg = ref('');

  async function sendEmailVerification() {
    loading.value = true;
    let { data, error } = await client.auth.resetPasswordForEmail(email.value);
    success.value = true;
    loading.value = false;
    setTimeout(() => {
      router.push('/')
    }, 3000)
    if (error) {
      loading.value = false;
      errorMsg.value = error.message;
      showAlert({
				title: 'Error',
				description: 'Erro na validacao do email, tente novamente.',
				color: 'red',
				icon: 'i-lucide-octagon-x',
			});
    }
  }

  const goToLoginPage = () => {
    emit('goBackLogin', true);
  }
</script>