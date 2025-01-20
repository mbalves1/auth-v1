<template>
    <input
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      class="mb-2 bg-gray-800 text-gray-400 border focus:border-transparent border-gray-700 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
      :class="hasIconSpace ? 'pl-12' : 'pl-4'"
      autocomplete="off"
      @input="$emit('update:modelValue', $event.target.value)"
    >
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  id: {
    type: String,
  },
  valueInput: {
    type: String
  },
  hasIconSpace: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

</script>