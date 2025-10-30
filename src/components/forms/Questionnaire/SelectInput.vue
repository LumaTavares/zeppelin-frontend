<template>
  <div class="space-y-1.5">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }} <span v-if="required" class="text-red-600">*</span>
    </label>

    <select
      class="w-full h-11 rounded-lg border px-3 py-2 text-sm bg-white dark:bg-dark-900
             border-gray-300 dark:border-white/10 text-gray-800 dark:text-white/90
             focus:outline-none focus:ring focus:border-blue-500
             disabled:opacity-60 disabled:cursor-not-allowed"
      :class="{ 'border-red-500': error }"
      :disabled="disabled"
      v-model="localValue"
    >
      <option :value="''" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>

    <p v-if="help && !error" class="text-xs text-gray-500">{{ help }}</p>
    <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  options: string[]
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  help?: string
  error?: string
}>()

const emit = defineEmits<{ (e:'update:modelValue', v:string):void }>()

const localValue = computed({
  get: () => props.modelValue ?? '',
  set: v => emit('update:modelValue', v),
})
</script>
