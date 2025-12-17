import { ref } from 'vue';
import { api } from '@/services/api'
import { useOrganizationStore } from '@/stores/organization'
import { 
  stateMapping, 
  typeMapping, 
  sizeMapping
} from '@/constants/profileOptions'

export function useOrganizationProfile() {
  const Bussines_name = ref('')
  const selectedState = ref('')
  const foundedYear = ref<number | null>(null)
  const SelectType = ref('')
  const select_Bussines_size = ref('')
  const description = ref('')
  const organization = ref<any>({})

  const fetchOrganizationData = async (userEmail: string) => {
    const token = localStorage.getItem('access_token');
    if (!token || !userEmail) return

    try {
      let allEmployees: any[] = [];
      let currentPage = 1
      let totalPages = 1

      // Initial request
      const initialResponse = await api.get('/employee/employee/', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage }
      });

      const initialData = initialResponse.data?.data
      if (Array.isArray(initialData)) {
        allEmployees = allEmployees.concat(initialData)
      }

      const meta = initialResponse.data?.meta;
      if (meta && meta.total && meta.per_page) {
        totalPages = Math.ceil(meta.total / meta.per_page)
      }

      // Fetch remaining pages
      for (currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await api.get('/employee/employee/', {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: currentPage }
        });
        
        const employeesOnPage = response.data?.data
        if (Array.isArray(employeesOnPage)) {
          allEmployees = allEmployees.concat(employeesOnPage)
        }
      }

      const employee = allEmployees.find((e: any) => e.e_mail && e.e_mail.toLowerCase() === userEmail.toLowerCase())
      
      if (employee && employee.employee_organization) {
        organization.value = employee.employee_organization
        
        // Populate form fields
        Bussines_name.value = organization.value.name || ''
        selectedState.value = stateMapping[organization.value.location] || ''
        foundedYear.value = organization.value.age || null
        select_Bussines_size.value = sizeMapping[organization.value.organization_size] || ''
        description.value = organization.value.description || ''
        
        // Map organization_type ID to name
        if (organization.value.organization_type) {
          SelectType.value = typeMapping[organization.value.organization_type] || ''
        }
      }
    } catch (error) {
      console.error('Error fetching organization data:', error)
    }
  };

  const saveOrganization = async () => {
    const token = localStorage.getItem('access_token')
    const organizationStore = useOrganizationStore()

    if (!Bussines_name.value || !selectedState.value || !foundedYear.value || !SelectType.value || !select_Bussines_size.value) {
      console.warn('Organization form incomplete. Not saving.')
      return
    }

    // Reverse mapping to find IDs
    const size_id = Number(Object.keys(sizeMapping).find(key => sizeMapping[Number(key)] === select_Bussines_size.value));
    const state_id = Number(Object.keys(stateMapping).find(key => stateMapping[Number(key)] === selectedState.value));
    const type_id = Number(Object.keys(typeMapping).find(key => typeMapping[Number(key)] === SelectType.value));

    const organizationPayload = {
      name: Bussines_name.value,
      description: description.value,
      organization_size: size_id,
      organization_type: type_id,
      age: foundedYear.value,
      location: state_id
    };

    console.log('Saving organization with payload:', organizationPayload);

    let response_organization;
    if (organization.value && organization.value.id) {
      response_organization = await api.patch(
        `/organization/organization/${organization.value.id}/`,
        organizationPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      response_organization = await api.post(
        '/organization/organization/',
        organizationPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    const organizationId = response_organization.data.id
    organization.value = response_organization.data
    organizationStore.setOrganizationId(organizationId)
    console.log('Organization saved successfully:', response_organization.data)
    
    return response_organization.data;
  };

  return {
    Bussines_name,
    selectedState,
    foundedYear,
    SelectType,
    select_Bussines_size,
    description,
    organization,
    fetchOrganizationData,
    saveOrganization
  }
}
