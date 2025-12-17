import { ref, onMounted, computed } from 'vue'
import { api } from '@/services/api'

interface State {
  id: number
  name: string
  region_state?: any
}

interface OrganizationType {
  id: number
  name: string
}

interface AcademicDegree {
  id: number
  name: string
}

interface AcademicDegreeStatus {
  id: number
  name: string
  label?: string
}

interface Position {
  id: number
  name: string
}

interface OrganizationSize {
  id: number
  name: string
}

export const useProfileOptions = () => {
  const states = ref<State[]>([])
  const organizationTypes = ref<OrganizationType[]>([])
  const academicDegrees = ref<AcademicDegree[]>([])
  const academicDegreeStatuses = ref<AcademicDegreeStatus[]>([])
  const positions = ref<Position[]>([])
  const organizationSizes = ref<OrganizationSize[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadStates = async () => {
    try {
      loading.value = true
      let allStates: State[] = []
      let currentPage = 1
      let totalPages = 1

      // Initial request
      const initialResponse = await api.get('/organization/state/', { params: { page: 1 } })
      const initialData = initialResponse.data?.data || initialResponse.data
      if (Array.isArray(initialData)) {
        allStates = allStates.concat(initialData)
      }

      // Check pagination info
      const meta = initialResponse.data?.meta
      if (meta && meta.total && meta.per_page) {
        totalPages = Math.ceil(meta.total / meta.per_page)
      }

      // Fetch remaining pages
      for (currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await api.get('/organization/state/', { params: { page: currentPage } })
        const pageData = response.data?.data || response.data
        if (Array.isArray(pageData)) {
          allStates = allStates.concat(pageData)
        }
      }

      states.value = allStates
    } catch (err) {
      error.value = 'Erro ao carregar estados'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const loadOrganizationTypes = async () => {
    try {
      loading.value = true
      let allTypes: OrganizationType[] = []
      let currentPage = 1
      let totalPages = 1

      // Initial request
      const initialResponse = await api.get('/organization/organizationtype/', { params: { page: 1 } })
      const initialData = initialResponse.data?.data || initialResponse.data
      if (Array.isArray(initialData)) {
        allTypes = allTypes.concat(initialData)
      }

      // Check pagination info
      const meta = initialResponse.data?.meta
      if (meta && meta.total && meta.per_page) {
        totalPages = Math.ceil(meta.total / meta.per_page)
      }

      // Fetch remaining pages
      for (currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await api.get('/organization/organizationtype/', { params: { page: currentPage } })
        const pageData = response.data?.data || response.data
        if (Array.isArray(pageData)) {
          allTypes = allTypes.concat(pageData)
        }
      }

      organizationTypes.value = allTypes
    } catch (err) {
      error.value = 'Erro ao carregar tipos de organização'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const loadAcademicDegrees = async () => {
    try {
      loading.value = true
      let allDegrees: AcademicDegree[] = []
      let currentPage = 1
      let totalPages = 1

      // Initial request
      const initialResponse = await api.get('/employee/academicdegree/', { params: { page: 1 } })
      const initialData = initialResponse.data?.data || initialResponse.data
      if (Array.isArray(initialData)) {
        allDegrees = allDegrees.concat(initialData)
      }

      // Check pagination info
      const meta = initialResponse.data?.meta
      if (meta && meta.total && meta.per_page) {
        totalPages = Math.ceil(meta.total / meta.per_page)
      }

      // Fetch remaining pages
      for (currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await api.get('/employee/academicdegree/', { params: { page: currentPage } })
        const pageData = response.data?.data || response.data
        if (Array.isArray(pageData)) {
          allDegrees = allDegrees.concat(pageData)
        }
      }

      academicDegrees.value = allDegrees
    } catch (err) {
      error.value = 'Erro ao carregar graus acadêmicos'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const loadAcademicDegreeStatuses = async () => {
    try {
      loading.value = true
      let allStatuses: AcademicDegreeStatus[] = []
      let currentPage = 1
      let totalPages = 1

      // Initial request
      const initialResponse = await api.get('/employee/academicdegreestatus/', { params: { page: 1 } })
      const initialData = initialResponse.data?.data || initialResponse.data
      if (Array.isArray(initialData)) {
        allStatuses = allStatuses.concat(initialData)
      }

      // Check pagination info
      const meta = initialResponse.data?.meta
      if (meta && meta.total && meta.per_page) {
        totalPages = Math.ceil(meta.total / meta.per_page)
      }

      // Fetch remaining pages
      for (currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await api.get('/employee/academicdegreestatus/', { params: { page: currentPage } })
        const pageData = response.data?.data || response.data
        if (Array.isArray(pageData)) {
          allStatuses = allStatuses.concat(pageData)
        }
      }

      academicDegreeStatuses.value = allStatuses
    } catch (err) {
      error.value = 'Erro ao carregar status de grau acadêmico'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const loadPositions = async () => {
    try {
      loading.value = true
      let allPositions: Position[] = []
      let currentPage = 1
      let totalPages = 1

      // Initial request
      const initialResponse = await api.get('/employee/position/', { params: { page: 1 } })
      const initialData = initialResponse.data?.data || initialResponse.data
      if (Array.isArray(initialData)) {
        allPositions = allPositions.concat(initialData)
      }

      // Check pagination info
      const meta = initialResponse.data?.meta
      if (meta && meta.total && meta.per_page) {
        totalPages = Math.ceil(meta.total / meta.per_page)
      }

      // Fetch remaining pages
      for (currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await api.get('/employee/position/', { params: { page: currentPage } })
        const pageData = response.data?.data || response.data
        if (Array.isArray(pageData)) {
          allPositions = allPositions.concat(pageData)
        }
      }

      positions.value = allPositions
    } catch (err) {
      error.value = 'Erro ao carregar posições'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const loadSizes = async () => {
    try {
      loading.value = true
      const { data } = await api.get('/organization/size/')
      console.log('Sizes data:', data) // Debug log
      const sizesData = data.data || data
      // Keep only id and name fields
      organizationSizes.value = sizesData.map((size: any) => ({
        id: size.id,
        name: size.name
      }))
    } catch (err) {
      error.value = 'Erro ao carregar tamanhos de organização'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Mapeamento dinâmico de size ID para nome
  const sizeMapping = computed(() => {
    const mapping: any = {}
    organizationSizes.value.forEach(size => {
      mapping[size.id] = size.name
    })
    return mapping
  })

  // Função para carregar tudo
  const loadAll = async () => {
    try {
      loading.value = true
      await Promise.all([
        loadStates(),
        loadOrganizationTypes(),
        loadAcademicDegrees(),
        loadAcademicDegreeStatuses(),
        loadPositions(),
        loadSizes()
      ])
    } catch (err) {
      error.value = 'Erro ao carregar opções'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    states,
    organizationTypes,
    academicDegrees,
    academicDegreeStatuses,
    positions,
    organizationSizes,
    sizeMapping,
    loading,
    error,
    loadStates,
    loadOrganizationTypes,
    loadAcademicDegrees,
    loadAcademicDegreeStatuses,
    loadPositions,
    loadSizes,
    loadAll
  }
}
