<template>
  <div class="h-screen flex justify-center items-center dark:bg-gray-900">
    <div class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl dark:bg-gray-800">
      <div class="flex flex-row gap-3 pb-4">
        <h1 class="text-3xl font-bold text-[#4B5563] my-auto">Your Company</h1>
      </div>
      <div class="text-sm font-light text-[#6B7280] pb-8 ">Register to your account on Your Company.</div>
      <!---->
      <form class="flex flex-col">
        <div class="sm:pb-2 md:flex md:space-x-2">
          <div class="flex flex-col w-full">
            <Label forProps="firstName">First name</Label>
            <div class="relative text-gray-400">
              <Input
                type="text"
                id="firstName"
                name="firstName"
                :has-icon-space="false"
                placeholder="John"
                v-model="formData.firstName"
              />
            </div>
          </div>
          <div class="flex flex-col w-full">
            <Label forProps="lastName">Last name</Label>
            <div class="relative text-gray-400">
              <Input
                type="test"
                id="lastName"
                name="lastName"
                :has-icon-space="false"
                placeholder="Doe"
                v-model="formData.lastName"
              />
            </div>
          </div>
        </div>
        <div class="pb-2">
          <Label forProps="email">Email</Label>
          <div class="relative text-gray-400">
          <Input
            type="email"
            id="email"
            :has-icon-space="false"
            name="email"
            placeholder="name@company.com"
            v-model="formData.email"
          />
          </div>
        </div>
        <div class="pb-6">
          <Label forProps="password">Password</Label>
          <div class="relative text-gray-400">
            <span class="absolute cursor-pointer inset-y-0 right-0 flex items-center p-1 pr-3">
              <LucideEye @click="openPass" v-if="passwordType"/>
              <LucideEyeOff @click="openPass" v-else/>
            </span>

            <Input
              :type="passwordType ? 'password' : 'text'"
              :has-icon-space="false"
              id="password"
              name="password"
              placeholder="••••••••••"
              v-model="formData.password"
            />
          </div>
          <div class="flex justify-end text-red-500 text-sm">{{ errorMsg }}</div>
          <div class="flex justify-end text-green-500 text-sm">{{  successMsg }}</div>
        </div>
        <Button
          :loading="loading"
          title="Register"
          @clickCustom="signUp()"  
        ></Button>
        <div class="text-sm font-light text-[#6B7280] ">Have an accout <a href="/" class="font-medium text-primary hover:underline">Logn In</a>

        </div>
      </form>
      <!---->
    </div>
</div>
</template>
<script setup>
  definePageMeta({
		layout: 'login',
	});

  const client = useSupabaseClient();
  const { showAlert } = useAlert();

  const formData = ref({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const errorMsg = ref('');
  const successMsg = ref('');
  const passwordType = ref(true);
  const loading = ref(false);

  function openPass () {
    passwordType.value = !passwordType.value;
  };

  async function signUp() {
    console.log('formData', formData.value);
    loading.value = true;
    try {
      const { data, error } = await client.auth.signUp({
        email: formData.value.email,
        password: formData.value.password,
        options: {
          data: {
            firstName: formData.value.firstName,
            lastName: formData.value.lastName,
          },
        },
      });
      if (error) {
        loading.value = false;
        showAlert({
          title: 'Error create account!',
          description: 'Credenciais inválidas, tente novamente.',
          color: 'red',
          icon: 'i-heroicons-exclamation-circle',
        });
      };
      showAlert({
        title: 'Success, email send!',
        description: 'Check your email to confirm your account.',
        color: 'primary',
        icon: 'i-heroicons-exclamation-circle',
      });
      
      loading.value = false;
      successMsg.value = 'Check your email to confirm your account';
    } catch (error) {
      loading.value = false;
      showAlert({
        title: 'Error create account!',
        description: 'Credenciais inválidas, tente novamente.',
        color: 'red',
        icon: 'i-heroicons-exclamation-circle',
      });
    }
  }
</script>