<template>
   <div>
      <div class="border-2">
        <form @submit.prevent="signUp()" class="flex flex-col w-2/4 space-y-2">
          <label>Email</label>
          <input v-model="email" class="border-1" name="email">
          <label>Pass</label>
          <input v-model="password">

          <div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white">Register</button>
          </div>
        </form>
      </div>
    </div>
</template>
<script setup>
  const client = useSupabaseClient();
  const email = ref(''); 
  const password = ref('');
  const errorMsg = ref('');
  const successMsg = ref('');

  async function signUp() {
    try {
      const { data, error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      successMsg.value = 'Check your email to confirm your account';
    } catch (error) {
      errorMsg.value = error.message
    }
  }
</script>