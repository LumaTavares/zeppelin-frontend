<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="pageTitle" />

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="space-y-6">
        <ComponentCard :title="pageTitle">
          <div class="space-y-4 dark:text-white">
            <QuestionItem
              v-for="q in left"
              :key="q.id"
              :question="q"
              v-model:adoption="answers[q.id].adoption"
              v-model:comment="answers[q.id].comment"
            />
          </div>
        </ComponentCard>
      </div>

      <div class="space-y-6">
        <ComponentCard title="continuação">
          <div class="space-y-4 dark:text-white">
            <QuestionItem
              v-for="q in right"
              :key="q.id"
              :question="q"
              v-model:adoption="answers[q.id].adoption"
              v-model:comment="answers[q.id].comment"
            />
          </div>
        </ComponentCard>

        <div class="flex justify-end">
          <button class="px-4 py-2 bg-brand-950  text-white rounded-lg hover:bg-brand-900" @click="submit">
            salvar
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import QuestionItem from './QuestionItem.vue'

import QUESTIONS from '@/data/continuous_deployment.json'
import { useQuestionnaire } from '@/composables/useQuestionnaire'

const pageTitle = 'Continuous Deployment'
const { answers, left, right, dump } = useQuestionnaire(QUESTIONS as any)

function submit() {
  console.log('continuous deployment answers:', dump())
}
</script>
