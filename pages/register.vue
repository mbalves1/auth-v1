<template>
  <div class="h-screen flex justify-center items-center dark:bg-gray-900">
    <div class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl dark:bg-gray-800">
      <div class="flex flex-row gap-3 pb-4">
        <h1 class="text-3xl font-bold text-[#4B5563] my-auto">Your Company</h1>
      </div>
      <div class="text-sm font-light text-[#6B7280] pb-8 ">Register to your account on Your Company.</div>
      <!---->
      <form class="flex flex-col" @submit.prevent="signUp()">
        <div class="sm:pb-2 md:flex md:space-x-2">
          <div class="flex flex-col">
            <Label forProps="firstName">First name</Label>
            <div class="relative text-gray-400">
              <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <LucideMail />
              </span> 
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                v-model="formData.firstName"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <Label forProps="lastName">Last name</Label>
            <div class="relative text-gray-400">
              <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <LucideMail />
              </span> 
              <Input
                type="test"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                v-model="formData.lastName"
              />
            </div>
          </div>
        </div>
        <div class="pb-2">
          <Label forProps="email">Email</Label>
          <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
            <LucideMail />
          </span> 
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="name@company.com"
            v-model="formData.email"
          />
          </div>
        </div>
        <div class="pb-6">
          <Label forProps="password">Password</Label>
          <div class="relative text-gray-400">
            <span class="absolute cursor-pointer inset-y-0 left-0 flex items-center p-1 pl-3">
              <LucideSquareAsterisk />
            </span>
            <span class="absolute cursor-pointer inset-y-0 right-0 flex items-center p-1 pr-3">
              <LucideEye @click="openPass" v-if="passwordType"/>
              <LucideEyeOff @click="openPass" v-else/>
            </span>

            <Input
              :type="passwordType ? 'password' : 'text'"
              id="password"
              name="password"
              placeholder="••••••••••"
              v-model="formData.password"
            />
          </div>
          <div class="flex justify-end text-red-500 text-sm">{{ errorMsg }}</div>
          <div class="flex justify-end text-green-500 text-sm">{{  successMsg }}</div>
        </div>
        <button type="submit" class="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Register</button>
        <div class="text-sm font-light text-[#6B7280] ">Have an accout <a href="/" class="font-medium text-[#4F46E5] hover:underline">Logn In</a>

        </div>
      </form>
      <!---->
    </div>
</div>
</template>
<script setup>
  const client = useSupabaseClient();
  const formData = reactive({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const errorMsg = ref('');
  const successMsg = ref('');
  const passwordType = ref(true);

  function openPass () {
    passwordType.value = !passwordType.value;
  };

  async function signUp() {
    try {
      const { data, error } = await client.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        },
      });
      if (error) throw error;
      successMsg.value = 'Check your email to confirm your account';
    } catch (error) {
      errorMsg.value = error.message
    }
  }
</script>