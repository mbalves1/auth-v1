<template>
  <div class="h-screen flex justify-center items-center">
    <div class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl border-2">
      <div class="flex flex-row gap-3 pb-4">
          <!---->
          <h1 class="text-3xl font-bold text-[#4B5563] my-auto">Your Company</h1>

      </div>
      <div class="text-sm font-light text-[#6B7280] pb-8 ">Login to your account on Your Company.</div>
      <!---->
      <form class="flex flex-col" @submit.prevent="sendEmailVerification()">
        <div class="pb-2">
          <label for="email" class="block mb-2 text-sm font-medium text-[#111827]">Email</label>
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span> 
              <input type="email" name="email" id="email" class="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="name@company.com" autocomplete="off" v-model="email">
          </div>
          <div v-if="success" class="flex justify-end text-green-500 text-sm">
            <span>Email sent check your inbox</span>
          </div>
          <div>{{ errorMsg }}</div>
        </div>
        <button type="submit" class="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Login</button>
        <div class="text-sm font-light text-[#6B7280] ">Don't have an accout yet? <a href="/register" class="font-medium text-[#4F46E5] hover:underline">Sign Up</a>

        </div>
      </form>
      <!---->
    </div>
</div>
</template>
<script setup>
  const client = useSupabaseClient();
  const router = useRouter();
  const success = ref(false);

  const email = ref('');
  const errorMsg = ref('');

  async function sendEmailVerification() {
    console.log('envoi');
    try {
      let { data, error } = await client.auth.resetPasswordForEmail(email.value);
      success.value = true;
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      errorMsg.value = error.message;
    }
  }
</script>