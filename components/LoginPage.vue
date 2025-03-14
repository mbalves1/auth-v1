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
			<div class="flex items-center my-3">
				<div class="flex-grow border-t border-gray-600"></div>
				<span class="mx-4 text-gray-500 font-semibold text-sm">or</span>
				<div class="flex-grow border-t border-gray-600"></div>
			</div>
			<button
				:class="{'bg-gray-700': loadingGoogle}"
				@click="signInWithGoogle()"
				class="w-full focus:ring-4 border focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 flex text-center align-center justify-center space-x-4"
			>
				<div class="w-[20px]">
					<img src="/public/g_icon.svg">
				</div>
				Google
				<LucideLoaderCircle
					v-if="loadingGoogle"
					class="h-5 w-5 animate-spin"></LucideLoaderCircle>
			</button>
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
	const loadingGoogle = ref(false);

	onMounted(async () => {
    const { data: { session }, error } = await client.auth.getSession();

    if (session) {
			console.log('Usuário autenticado:', session.user);
			const token = useCookie('auth_token', {
					maxAge: 60 * 60 * 24 * 7,
					secure: true,
					httpOnly: false,
					sameSite: 'strict'
			});

			token.value = session.access_token;
			await registerWithSupabaseInNest(session.user);
			router.push('/home');
    } else {
			console.log('Usuário não autenticado');
    }
	});

	function openPass() {
		passwordType.value = !passwordType.value;
	}

	async function signInWithGoogle() {
    loadingGoogle.value = true;

    const { data: { session }, error } = await client.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/home`,
			},
    });

		await useSupabaseUser();

    if (error) {
			showAlert({
				title: 'Erro no login com Google',
				description: 'Ocorreu um erro ao tentar fazer login com o Google.',
				color: 'red',
				icon: 'i-lucide-octagon-x',
				time: 7000
			});
			loadingGoogle.value = false;
			return;
    }

    const token = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // Expira em 7 dias
        secure: true, // Apenas HTTPS em produção
        httpOnly: false, // Defina true se quiser impedir acesso no frontend
        sameSite: 'strict'
    });

    token.value = data.session?.access_token;

    // Registra o usuário no seu backend (NestJS) se necessário
		await registerWithSupabaseInNest(session.user);
    router.push('/home');
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

		const token = useCookie('auth_token', {
			maxAge: 60 * 60 * 24 * 7, // Expira em 7 dias
			secure: true, // Apenas HTTPS em produção
			httpOnly: false, // Defina true se quiser impedir acesso no frontend
			sameSite: 'strict'
		});

		token.value = data?.session?.access_token

		await registerWithSupabaseInNest(data?.user)
		router.push('/home');
	}

	async function registerWithSupabaseInNest(user) {
		const { email, id, user_metadata, birthday } = user;
		
		let firstName = '';
		let lastName = '';

		if (user_metadata?.full_name) {
			const nameParts = user_metadata.full_name.split(' ');
			firstName = nameParts[0];
			lastName = nameParts.slice(1).join(' ');
		}

		try {
			await userStore.register({
				id,
				firstName,
				email,
				lastName,
				birthday,
				isActive: true
			});
		} catch (error) {
			router.push('/home');
		}
	}

  const goToRecoveryPage = () => {
    emit('goToRecoveryPassword', true);
  }
</script>

