<template>
  <div>
    Profile
    <button @click="logout" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Logout</button>
    <div>{{ user.email }}</div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"]
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

async function logout() {
  try {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    router.push("/");
  } catch (error) {
    console.error(error.message);
  }
}
</script>