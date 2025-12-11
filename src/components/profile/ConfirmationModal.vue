<template>
  <Modal v-if="show" @close="onCancel">
    <template #body>
      <div class="relative w-full max-w-md p-6 bg-white rounded-lg dark:bg-gray-800">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ message }}
          </p>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="onCancel"
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            @click="onConfirm"
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-brand-950 rounded-lg hover:bg-brand-900"
          >
            Confirmar
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Confirmação',
  },
  message: {
    type: String,
    default: 'Você tem certeza?',
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = () => {
  emit('confirm')
};

const onCancel = () => {
  emit('cancel')
};
</script>
