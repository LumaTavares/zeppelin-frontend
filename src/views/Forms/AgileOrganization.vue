<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="pageTitle" />

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="space-y-6 dark:text-white">
        <ComponentCard :title="pageTitle">
          <div class="space-y-4">
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

      <div class="space-y-6 dark:text-white">
        <ComponentCard title="continuação">
          <div class="space-y-4">
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

import QUESTIONS from '@/data/agile_organization.json'
import { useQuestionnaire } from '@/composables/useQuestionnaire'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { fetchEmployeeData } from '@/stores/user'

const pageTitle = 'Agile Organization'
const { answers, left, right, dump } = useQuestionnaire(QUESTIONS as any)

// State for dropdown options
const adoptedLevels = ref([])
const statements = ref([])

// Fetch initial data from the backend
onMounted(async () => {
  try {
    // Fetch employee and organization data
    await fetchEmployeeData()
    
  } catch (error) {
    console.error('Error fetching employee data:', error)
  }
})
   
</script>
