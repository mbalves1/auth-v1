<template>
  <div class="h-screen flex justify-center items-center">
    <div class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl border-2">
      <div class="flex flex-row gap-3 pb-4">
          <!---->
          <h1 class="text-3xl font-bold text-[#4B5563] my-auto">Your Company</h1>

      </div>
      <div class="text-sm font-light text-[#6B7280] pb-8 ">Login to your account on Your Company.</div>
      <!---->
      <form class="flex flex-col" @submit.prevent="updatePassword()">
        <div class="pb-1">
          <label for="password" class="block mb-2 text-sm font-medium text-[#111827]">Password</label>
            <div class="relative text-gray-400">
              <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <LucideEye @click="openPass" v-if="passwordType"/>
                <LucideEyeOff @click="openPass" v-else/>
              </span>
              <input :type="passwordType ? 'password' : 'text'" name="password" id="password" placeholder="••••••••••" class="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autocomplete="new-password" v-model="password">
            </div>
          </div>
          <div>
            <div class="pb-6">
              <label for="password" class="block mb-2 text-sm font-medium text-[#111827]">Confirm Password</label>
              <div class="relative text-gray-400">
                <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <LucideEye @click="openPass('confirm')" v-if="passwordTypeConfirm"/>
                  <LucideEyeOff @click="openPass('confirm')" v-else/>
                </span> 
                <input :type="passwordTypeConfirm ? 'password' : 'text'" name="password" id="password" placeholder="••••••••••" class="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autocomplete="new-password" v-model="passwordConfirm">
              </div>
              <div class="flex justify-end text-red-500 text-sm">{{ errorMsg }}</div>
            </div>
            <div v-if="success" class="flex justify-end text-green-500 text-sm">
              <span>Password updated!</span>
            </div>
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
  const passwordType = ref(true);
  const passwordTypeConfirm = ref(true);

  const password = ref('');
  const passwordConfirm = ref('');
  const errorMsg = ref('');  
  
  function openPass (params) {
    console.log('chamou');
    if (params === 'confirm') {
      passwordTypeConfirm.value = !passwordTypeConfirm.value
    } else {
      passwordType.value = !passwordType.value
    }
  }
  
  async function updatePassword() {
    const user = await useSupabaseUser();

    if (password.value !== passwordConfirm.value) {
      errorMsg.value = 'Password must be the same!'
    }
    try {
      const { data, error } = await client.auth.updateUser({
        email: user.value.email,
        password: password.value,
        data: { hello: 'world' }
      });
      success.value = true;
      setTimeout(() => {
        router.push('/')
      }, 5000)
    } catch (error) {
      errorMsg.value = error.message;
    }
  }
</script>