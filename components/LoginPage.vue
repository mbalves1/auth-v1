<template>
	<div>
		<form class="flex flex-col">
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
						v-model="email"
					/>
				</div>
			</div>
			<div class="pb-6">
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
						id="password"
						name="password"
						placeholder="••••••••••"
						v-model="password"
					/>
				</div>
				<div
					class="flex justify-end items-center text-gray-500 underline text-sm space-x-2 font-bold cursor-pointer"
					@click="goToRecoveryPage"
				>
					Forgot password
					<LucideArrowRight class="h-3 w-3"></LucideArrowRight>
				</div>
			</div>
			<Button :loading="loading" title="Login" @clickCustom="signIn()"></Button>
			<div class="text-sm font-light text-[#6B7280]">
				Don't have an accout yet?
				<a href="/register" class="font-medium text-primary hover:underline"
					>Sign Up</a
				>
			</div>
		</form>
	</div>
</template>
<script setup>
  const emit = defineEmits(['goToRecoveryPassword']);
  const { showAlert } = useAlert();

	const userStore = useUserStore();

	const client = useSupabaseClient();
	const router = useRouter();

	const email = ref('');
	const password = ref('');
	const passwordType = ref(true);
	const loading = ref(false);

	function openPass() {
		passwordType.value = !passwordType.value;
	}

	async function signIn() {
		loading.value = true;
		const { data, error } = await client.auth.signInWithPassword({
			email: email.value,
			password: password.value,
		});

		if (error) {
			showAlert({
				title: 'Erro no login',
				description: 'Credenciais inválidas, tente novamente.',
				color: 'red',
				icon: 'i-lucide-octagon-x',
				time: 7000
			});
			loading.value = false;
		}
		console.log('aqui');
	
		await registerWithSupabaseInNest(data?.user)
		console.log('aqui 1');
		router.push('/home');
	}

	async function registerWithSupabaseInNest(user) {
		const { email, id, user_metadata, birthday } = user;
		console.log('aqui 2');

		try {
			await userStore.register({
				id,
				firstName: user_metadata.firstName,
				email,
				lastName: user_metadata.lastName,
				birthday,
				isActive: true
			})

		console.log('aqui 3');

		} catch (error) {
			router.push('/home');
		}
	}

  const goToRecoveryPage = () => {
    emit('goToRecoveryPassword', true);
  }
</script>

