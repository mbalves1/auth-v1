<template>
	<div class="relative">
		<div class="h-screen flex justify-center items-center dark:bg-gray-900">
			<div
				class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl dark:bg-gray-800"
			>
				<div class="flex flex-row gap-3 pb-4">
					<h1 class="text-3xl font-bold text-primary my-auto">
						Your Company
					</h1>
				</div>
				<div class="text-sm font-light text-[#6B7280] pb-8">
					Login to your account on Your Company.
				</div>

				<!-- Transition for Login and Recovery -->
				<transition name="slide-fade" mode="out-in">
					<div key="login" v-if="loginPage">
						<form class="flex flex-col">
							<div class="pb-2">
								<Label forProps="email">Email</Label>
								<div class="relative text-gray-400">
									<span
										class="absolute inset-y-0 left-0 flex items-center p-1 pl-3"
									>
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
							<Button
								:loading="loading"
								title="Login"
								@clickCustom="signIn()"
							></Button>
							<div class="text-sm font-light text-[#6B7280]">
								Don't have an accout yet?
								<a
									href="/register"
									class="font-medium text-primary hover:underline"
									>Sign Up</a
								>
							</div>
						</form>
					</div>

					<div key="recovery" v-else>
						<ResetPassword @go-back-login="goBackToLogin" />
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: 'default',
	});

	const { showAlert } = useAlert();

	const client = useSupabaseClient();
	const router = useRouter();

	const email = ref('');
	const password = ref('');
	const passwordType = ref(true);
	const loading = ref(false);

	const loginPage = ref(true);

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
				title: 'Erro no Login',
				description: 'Credenciais inválidas, tente novamente.',
				color: 'red',
				icon: 'i-lucide-octagon-x',
			});
			loading.value = false;
		}
		console.log(data);
		router.push('/profile');
	}

	function goToRecoveryPage() {
		loginPage.value = false;
	}

	function goBackToLogin() {
		loginPage.value = true;
	}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}

.slide-fade-enter-from {
	opacity: 0;
	transform: translateX(20px);
}

.slide-fade-leave-to {
	opacity: 0;
	transform: translateX(20px);
}
</style>
