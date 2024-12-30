<template>
	<div class="relative">
		<div class="h-screen flex justify-center items-center dark:bg-gray-900">
			<div
				class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl dark:bg-gray-800"
			>
				<div class="flex flex-row gap-3 pb-4">
					<!---->
					<h1 class="text-3xl font-bold text-[#4B5563] my-auto">
						Your Company
					</h1>
				</div>
				<div class="text-sm font-light text-[#6B7280] pb-8">
					Login to your account on Your Company.
				</div>
				<!---->
				<form class="flex flex-col" @submit.prevent="signIn()">
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
								@value-input="handleInputEmail"
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
								@value-input="handleInputPassword"
							/>
						</div>
						<div class="flex justify-end text-red-500 text-sm">
							{{ errorMsg }}
						</div>
						<div
							class="flex justify-end items-center text-gray-500 underline text-sm space-x-2 font-bold cursor-pointer"
							@click="goToRecoveryPage"
						>
							Forgot password
							<LucideArrowRight class="h-3 w-3"></LucideArrowRight>
						</div>
					</div>
					<button
						type="submit"
						class="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
					>
						Login >>>>>>
					</button>
					<div class="text-sm font-light text-[#6B7280]">
						Don't have an accout yet?
						<a
							href="/register"
							class="font-medium text-[#4F46E5] hover:underline"
							>Sign Up</a
						>
					</div>
				</form>
				<!---->
			</div>
		</div>
	</div>
</template>
<script setup>
	definePageMeta({
		layout: 'default'
	})

	const notificationStore = useNotification()

	const successMsg = ref({
    title: 'Login Attempt',
    message: 'You tried to log in with email: ',
    colorText: 'text-blue-700',  // Exemplo de cor para o texto
    colorBorder: 'border-blue-400'  // Exemplo de cor para a borda
  })

	const client = useSupabaseClient();
	const router = useRouter();

	const email = ref('');
	const password = ref('');
	const passwordType = ref(true);
	const errorMsg = ref('');

	function openPass() {
		passwordType.value = !passwordType.value;
	}

	function handleInputEmail(event) {
		email.value = event;
	}

	function handleInputPassword(event) {
		password.value = event;
	}

	async function signIn() {

		notificationStore.sendNotification({
			title: 'Login Attempt',
			message: 'Você tentou logar com o email: ',
			colorText: 'text-blue-700', // Exemplo de cor para o texto
			colorBorder: 'border-blue-400', // Exemplo de cor para a borda
			show: true,
		})

		// console.log('>> email.value', email.value);
		// try {
		// 	const { data, error } = await client.auth.signInWithPassword({
		// 		email: email.value,
		// 		password: password.value,
		// 	});
		// 	console.log('data', data);
		// 	if (error) throw error;
		// 	router.push('/profile');
		// } catch (error) {
		// 	errorMsg.value = error.message;
		// }
	}

	function goToRecoveryPage() {
		router.push('/reset-password');
	}
</script>
