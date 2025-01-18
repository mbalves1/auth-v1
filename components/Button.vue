<template>
  <button
		class="w-full text-black bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 flex text-center align-center justify-center space-x-4"
		@click.prevent="handleEvent"
		:disabled="loading"
	>
		<LucideLoaderCircle
			v-if="loading"
			class="h-5 w-5 animate-spin"></LucideLoaderCircle>
		<span>{{ title }}</span>
	</button>
</template>
<script setup>
const props = defineProps({
  loading: {
		type: Boolean,
		required: false,
		default: false,
	},
	title: {
		type: String,
		required: true,
		default: "Label"
	}
})

const emit = defineEmits(['clickCustom'])

const handleEvent = () => {
	emit('clickCustom')
}
</script>