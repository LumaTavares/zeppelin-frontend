<template>
  <div class="p-4 border rounded-lg shadow-sm space-y-3">
    <p class="font-medium">{{ question.code }} — {{ question.text }}</p>

    <QuestionnaireSelect
      label="Adoption level"
      :options="ADOPTION_LEVELS"
      placeholder="Selecione…"
      v-model="localAdoption"
    />

    <QuestionnaireTextArea
      label="Comment (opcional)"
      placeholder="Digite observações para esta questão…"
      :rows="4"
      v-model="localComment"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import QuestionnaireSelect from '@/components/forms/Questionnaire/SelectInput.vue'
import QuestionnaireTextArea from '@/components/forms/Questionnaire/TextArea.vue'

const ADOPTION_LEVELS = [
  'Not adopted',
  'Abandoned',
  'Project / Product',
  'Process',
  'Institutionalized',
]

const props = defineProps<{
  question: { id: string; code: string; text: string }
  adoption?: string
  comment?: string
}>()

const emit = defineEmits<{
  (e: 'update:adoption', v: string): void
  (e: 'update:comment', v: string): void
}>()

const localAdoption = computed({
  get: () => props.adoption ?? '',
  set: (v: string) => emit('update:adoption', v),
})

const localComment = computed({
  get: () => props.comment ?? '',
  set: (v: string) => emit('update:comment', v),
})
</script>
