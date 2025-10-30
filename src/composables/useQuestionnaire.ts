import { ref, computed, onMounted } from 'vue'

export type Q = { id: string; code: string; text: string }
export type A = { adoption: string; comment: string }

export function useQuestionnaire(QUESTIONS: Q[]) {
  const questions = ref<Q[]>([])
  const answers = ref<Record<string, A>>({})

  onMounted(() => {
    questions.value = QUESTIONS ?? []
    for (const q of questions.value) {
      answers.value[q.id] = { adoption: '', comment: '' }
    }
  })

  const half = computed(() => Math.ceil(questions.value.length / 2))
  const left = computed(() => questions.value.slice(0, half.value))
  const right = computed(() => questions.value.slice(half.value))

  const dump = () => JSON.parse(JSON.stringify(answers.value))

  return { questions, answers, left, right, dump }
}
