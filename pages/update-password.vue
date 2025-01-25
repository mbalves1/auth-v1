<template>
	<div class="h-screen flex justify-center items-center dark:bg-gray-900">
		<div
			class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl dark:bg-gray-800"
		>
			<div class="flex flex-row gap-3 pb-4">
				<!---->
				<h1 class="text-3xl font-bold text-primary my-auto">Your Company</h1>
			</div>
			<div class="text-sm font-light text-[#6B7280] pb-8">
				Login to your account on Your Company.
			</div>
			<!---->
			<form class="flex flex-col">
				<div class="pb-1">
					<Label forProps="password">Password</Label>
					<div class="relative text-gray-400">
						<span
							class="absolute cursor-pointer inset-y-0 left-0 flex items-center p-1 pl-3"
						>
							<LucideSquareAsterisk />
						</span>
						<span
							class="absolute cursor-pointer inset-y-0 right-0 flex items-center p-1 pr-3"
						>
							<LucideEye @click="openPass" v-if="passwordType" />
							<LucideEyeOff @click="openPass" v-else />
						</span>
            <Input
							:type="passwordType ? 'password' : 'text'"
							name="password"
							id="password"
							placeholder="••••••••••"
							v-model="password"
            />
					</div>
				</div>
				<div>
					<div class="pb-6">
						<Label forProps="confirmPassword">Confirm Password</Label
						>
						<div class="relative text-gray-400">
							<span
								class="absolute inset-y-0 left-0 flex items-center p-1 pl-3"
							>
								<LucideSquareAsterisk />
							</span>
							<span
								class="absolute inset-y-0 right-0 flex items-center p-1 pr-3"
							>
								<LucideEye
									@click="openPass('confirm')"
									v-if="passwordTypeConfirm"
								/>
								<LucideEyeOff @click="openPass('confirm')" v-else />
							</span>
              <Input
								:type="passwordTypeConfirm ? 'password' : 'text'"
								name="password"
								id="password"
								placeholder="••••••••••"
								v-model="passwordConfirm"
              />
						</div>
						<div class="flex justify-end text-red-500 text-sm">
							{{ errorMsg }}
						</div>
					</div>
					<div v-if="success" class="flex justify-end text-green-500 text-sm">
						<span>Password updated!</span>
					</div>
				</div>
        <Button
          @clickCustom="updatePassword()"
          :loading="loading"
          title="Reset password"
        ></Button>
        
				<div class="text-sm font-light text-[#6B7280]">
					Don't have an accout yet?
					<a href="/register" class="font-medium text-primary hover:underline"
						>Sign Up</a
					>
				</div>
        <div>or</div>
        <div class="text-sm font-light text-[#6B7280]">
					have an accout
					<a href="/" class="font-medium text-primary hover:underline"
						>Login</a
					>
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
  const loading = ref(false);

	const password = ref('');
	const passwordConfirm = ref('');
	const errorMsg = ref('');

	function openPass(params) {
		if (params === 'confirm') {
			passwordTypeConfirm.value = !passwordTypeConfirm.value;
		} else {
			passwordType.value = !passwordType.value;
		}
	}

	async function updatePassword() {
    loading.value = true;
		const user = await useSupabaseUser();

		if (password.value !== passwordConfirm.value) {
			errorMsg.value = 'Password must be the same!';
		}
		try {
			const { data, error } = await client.auth.updateUser({
				email: user.value.email,
				password: password.value,
				data: { hello: 'world' },
			});
			success.value = true;
      loading.value = false;

			setTimeout(() => {
				router.push('/');
			}, 5000);
		} catch (error) {
      loading.value = false;
			errorMsg.value = error.message;
		}
	}
</script>
