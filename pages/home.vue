<template>
  <div class="flex">
    <main>
      <div>Main

      </div>
    </main>
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