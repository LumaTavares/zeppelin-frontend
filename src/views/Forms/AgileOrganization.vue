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
          <button 
            @click="submit"
            :disabled="isLoading"
            class="px-4 py-2 bg-brand-950 text-white rounded-lg hover:bg-brand-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Salvando...' : 'Salvar' }}
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
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useOrganizationStore } from '@/stores/organization'

const pageTitle = 'Agile Organization'
const { answers, left, right, dump } = useQuestionnaire(QUESTIONS as any)

const auth = useAuthStore()
const organizationStore = useOrganizationStore()

// Static mapping of adoption levels labels to IDs based on the database
// These IDs should match your AdoptedLevel table
const ADOPTION_LEVEL_MAPPING: Record<string, number> = {
  'Not adopted': 1,
  'Abandoned': 2,
  'Project / Product': 3,
  'Process': 4,
  'Institutionalized': 5,
}

// Static mapping of question codes to IDs based on the QUESTIONS data
const STATEMENT_ID_MAPPING: Record<string, number> = QUESTIONS.reduce((acc: Record<string, number>, q: any, index: number) => {
  acc[q.code || q.id] = index + 1 // Using index+1 as ID if not available
  return acc
}, {})

// State for dropdown options
const isLoading = ref(false)

const getEmployeeData = async (): Promise<{ id: number; organizationId: number } | null> => {
  try {
    const token = localStorage.getItem('access_token')
    const userEmail = auth.user?.email
    
    if (!token || !userEmail) {
      console.warn('No token or email found')
      return null
    }

    console.log('Fetching employee with email:', userEmail)

    // Fetch all employees and find the one matching the email
    let allEmployees: any[] = []
    let currentPage = 1
    let totalPages = 1

    // Get first page to check total
    const initialResponse = await axios.get('http://localhost:8000/employee/employee/', {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: currentPage }
    })

    const initialData = initialResponse.data?.data || initialResponse.data?.results || initialResponse.data || []
    if (Array.isArray(initialData)) {
      allEmployees = allEmployees.concat(initialData)
    }

    const meta = initialResponse.data?.meta
    if (meta && meta.total && meta.per_page) {
      totalPages = Math.ceil(meta.total / meta.per_page)
    }

    // Fetch remaining pages if needed
    for (currentPage = 2; currentPage <= totalPages; currentPage++) {
      const response = await axios.get('http://localhost:8000/employee/employee/', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage }
      })
      
      const pageData = response.data?.data || response.data?.results || response.data || []
      if (Array.isArray(pageData)) {
        allEmployees = allEmployees.concat(pageData)
      }
    }

    console.log('Total employees fetched:', allEmployees.length)

    // Find employee by email
    const employee = allEmployees.find((e: any) => 
      e.e_mail && e.e_mail.toLowerCase() === userEmail.toLowerCase()
    )

    if (!employee) {
      console.warn('Employee not found with email:', userEmail)
      return null
    }

    console.log('Employee found:', employee)

    // Extract organization ID (could be a number or an object with id property)
    let orgId = employee.employee_organization
    
    if (typeof orgId === 'object' && orgId !== null && 'id' in orgId) {
      orgId = orgId.id
    }

    orgId = Number(orgId)

    if (orgId && orgId > 0) {
      console.log('Organization ID found:', orgId)
      return {
        id: employee.id,
        organizationId: orgId
      }
    }

    console.warn('No valid organization ID found for employee')
    return null

  } catch (error) {
    console.error('Error fetching employee data:', error)
    return null
  }
}

const getOrganizationId = async (): Promise<number | null> => {
  const employeeData = await getEmployeeData()
  return employeeData?.organizationId ?? null
}

const getQuestionnaireId = async (): Promise<number | null> => {
  try {
    const token = localStorage.getItem('access_token')
    
    if (!token) {
      console.warn('No token found')
      return null
    }

    const employeeData = await getEmployeeData()
    if (!employeeData) {
      console.warn('Could not get employee data')
      return null
    }

    console.log('🔄 Attempting to create new questionnaire for employee:', employeeData.id)
    
    // Create a minimal text file with questionnaire metadata
    const timestamp = new Date().toISOString()
    const fileContent = `Questionnaire created at: ${timestamp}\nEmployee ID: ${employeeData.id}`
    const textBlob = new Blob([fileContent], { type: 'text/plain' })
    const textFile = new File([textBlob], `questionnaire_${timestamp.replace(/[:.]/g, '-')}.txt`, { type: 'text/plain' })
    
    const formData = new FormData()
    formData.append('employee_questionnaire', String(employeeData.id))
    formData.append('applied_date', timestamp)
    formData.append('document', textFile)
    
    console.log('📄 Sending questionnaire with file')
    console.log('🚀 Sending POST to /questionnaire/questionnaire/')
    
    const createResponse = await axios.post(
      'http://localhost:8000/questionnaire/questionnaire/',
      formData,
      { 
        headers: { 
          Authorization: `Bearer ${token}`
        }
      }
    )

    const newQuestionnaireId = createResponse.data?.id
    console.log('✅ Questionnaire created successfully with ID:', newQuestionnaireId)
    console.log('📊 Full response:', createResponse.data)
    return newQuestionnaireId

  } catch (error: any) {
    console.error('❌ FAILED to create questionnaire')
    console.error('❌ HTTP Status:', error.response?.status)
    console.error('❌ Error message:', error.response?.data?.detail || error.message)
    console.error('❌ Full error data:', JSON.stringify(error.response?.data))
    console.warn('⚠️ Skipping questionnaire creation - answers will be saved without questionnaire link')
    return null
  }
}


const submit = async () => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('access_token')
    const headers = { Authorization: `Bearer ${token}` }
    
    const answersData = dump()
    console.log('Raw answers:', answersData)

    // Get organization ID and questionnaire ID
    let organizationId = organizationStore.organizationId ? Number(organizationStore.organizationId) : null
    
    if (!organizationId || organizationId === 0) {
      console.log('Organization ID not in store, fetching from employee...')
      organizationId = await getOrganizationId()
    }

    console.log('Organization ID:', organizationId)

    if (!organizationId || organizationId === 0) {
      alert('Erro: Organização não foi encontrada. Por favor, complete o perfil da organização primeiro.')
      return
    }

    // Get or create questionnaire
    console.log('Fetching or creating questionnaire...')
    let questionnaireId = await getQuestionnaireId()
    
    if (!questionnaireId) {
      console.log('Skipping questionnaire creation - will save answers without questionnaire_answer field')
      questionnaireId = null
    }

    if (questionnaireId) {
      console.log('Questionnaire ID:', questionnaireId)
    }

    // Convert answers to backend format
    const processedAnswers: any[] = []
    
    for (const questionId in answersData) {
      const answer = answersData[questionId]
      
      // Find adopted level ID using the static mapping
      const adoptedLevelLabel = answer.adoption
      const adoptedLevelId = ADOPTION_LEVEL_MAPPING[adoptedLevelLabel]
      const statementId = STATEMENT_ID_MAPPING[questionId]
      
      console.log(`Question: ${questionId}, Adoption: ${adoptedLevelLabel}, AdoptedLevelId: ${adoptedLevelId}, StatementId: ${statementId}`)
      
      if (!adoptedLevelId || !statementId) {
        console.warn(`Missing adoption level or statement ID for question ${questionId}.`)
        continue
      }
      
      const answerPayload: any = {
        questionnaire_answer: questionnaireId,
        adopted_level_answer: adoptedLevelId,
        statement_answer: statementId,
        comment_answer: (answer.comment || '-').toString(),
        organization_answer: organizationId
      }
      
      // Only add questionnaire_answer if we have it
      if (questionnaireId) {
        answerPayload.questionnaire_answer = questionnaireId
      }
      
      processedAnswers.push(answerPayload)
    }
    
    console.log('Processed answers to save:', processedAnswers)
    
    if (processedAnswers.length === 0) {
      alert('Nenhuma resposta válida para salvar. Verifique se selecionou os níveis de adoção.')
      return
    }
    
    // Save each answer to the backend
    for (const answerPayload of processedAnswers) {
      try {
        console.log('Sending payload:', answerPayload)
        const response = await axios.post(
          'http://localhost:8000/questionnaire/answer/',
          answerPayload,
          { headers }
        )
        console.log('Answer saved:', response.data)
      } catch (e: any) {
        // Try with questionnaire prefix
        console.warn('Failed with /answer/, trying /questionnaire/answer/...')
        console.error('Error details:', e.response?.data)
        try {
          const response = await axios.post(
            'http://localhost:8000/questionnaire/questionnaire/answer/',
            answerPayload,
            { headers }
          )
          console.log('Answer saved (alt):', response.data)
        } catch (fallbackError: any) {
          console.error('Failed with both URLs. Error:', fallbackError.response?.data || fallbackError.message)
          throw fallbackError
        }
      }
    }
    
    console.log('All answers saved successfully!')
    alert('Respostas salvas com sucesso!')
    
  } catch (error: any) {
    console.error('Error saving answers:', error.response?.data || error.message)
    alert('Erro ao salvar respostas: ' + (error.response?.data?.detail || error.message))
  } finally {
    isLoading.value = false
  }
}
</script>
