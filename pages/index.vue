<template>
	<div class="relative">
		<div class="h-screen flex justify-center items-center dark:bg-gray-900">
			<div
				class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-1/3 mx-auto p-4 sm:p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl dark:bg-gray-800"
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
						<LoginPage @go-to-recovery-password="goToRecoveryPage"/>
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
		layout: 'login',
	});

	const loginPage = ref(true);

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
