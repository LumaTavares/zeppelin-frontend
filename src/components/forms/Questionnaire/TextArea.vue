<template>
  <div class="space-y-1.5">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }} <span v-if="required" class="text-red-600">*</span>
    </label>

    <textarea
      class="w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-dark-900
             border-gray-300 dark:border-white/10 text-gray-800 dark:text-white/90
             focus:outline-none focus:ring focus:border-blue-500 min-h-[96px]
             disabled:opacity-60 disabled:cursor-not-allowed resize-y"
      :class="{ 'border-red-500': error }"
      :rows="rows"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      v-model="localValue"
    />

    <div class="flex items-center justify-between">
      <p v-if="help && !error" class="text-xs text-gray-500">{{ help }}</p>
      <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
      <p v-if="counter && maxlength" class="text-xs text-gray-500 ml-auto">
        {{ (modelValue ?? '').length }} / {{ maxlength }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  required?: boolean
  maxlength?: number
  counter?: boolean
  help?: string
  error?: string
}>()

const emit = defineEmits<{ (e:'update:modelValue', v:string):void }>()

const localValue = computed({
  get: () => props.modelValue ?? '',
  set: v => emit('update:modelValue', v),
})
</script>
