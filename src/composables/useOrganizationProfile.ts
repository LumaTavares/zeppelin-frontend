import { ref } from 'vue';
import axios from 'axios';
import { useOrganizationStore } from '@/stores/organization'
import { 
  stateMapping, 
  typeMapping, 
  sizeMapping, 
  categoryMapping 
} from '@/constants/profileOptions'

export function useOrganizationProfile() {
  const Bussines_name = ref('');
  const selectedState = ref('');
  const foundedYear = ref<number | null>(null);
  const SelectType = ref('');
  const select_Bussines_size = ref('');
  const select_Bussines_Category = ref('');
  const description = ref('');
  const organization = ref<any>({});

  const fetchOrganizationData = async (userEmail: string) => {
    const token = localStorage.getItem('access_token');
    if (!token || !userEmail) return;

    try {
      let allEmployees: any[] = [];
      let currentPage = 1;
      let totalPages = 1;

      // Initial request
      const initialResponse = await axios.get('http://localhost:8000/employee/employee/', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage }
      });

      const initialData = initialResponse.data?.data;
      if (Array.isArray(initialData)) {
        allEmployees = allEmployees.concat(initialData);
      }

      const meta = initialResponse.data?.meta;
      if (meta && meta.total && meta.per_page) {
        totalPages = Math.ceil(meta.total / meta.per_page);
      }

      // Fetch remaining pages
      for (currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await axios.get('http://localhost:8000/employee/employee/', {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: currentPage }
        });
        
        const employeesOnPage = response.data?.data;
        if (Array.isArray(employeesOnPage)) {
          allEmployees = allEmployees.concat(employeesOnPage);
        }
      }

      const employee = allEmployees.find((e: any) => e.e_mail && e.e_mail.toLowerCase() === userEmail.toLowerCase());
      
      if (employee && employee.employee_organization) {
        organization.value = employee.employee_organization;
        
        // Populate form fields
        Bussines_name.value = organization.value.name || '';
        selectedState.value = stateMapping[organization.value.location] || '';
        foundedYear.value = organization.value.age || null;
        select_Bussines_size.value = sizeMapping[organization.value.organization_size] || '';
        description.value = organization.value.description || '';
        
        if (organization.value.organization_type_details) {
           SelectType.value = organization.value.organization_type_details.name || '';
        }
      }
    } catch (error) {
      console.error('Error fetching organization data:', error);
    }
  };

  const saveOrganization = async () => {
    const token = localStorage.getItem('access_token');
    const organizationStore = useOrganizationStore();

    if (!Bussines_name.value || !selectedState.value || !foundedYear.value || !SelectType.value || !select_Bussines_size.value || !select_Bussines_Category.value) {
      throw new Error('Please fill all fields');
    }

    // Reverse mapping to find IDs
    const size_id = Number(Object.keys(sizeMapping).find(key => sizeMapping[Number(key)] === select_Bussines_size.value));
    const state_id = Number(Object.keys(stateMapping).find(key => stateMapping[Number(key)] === selectedState.value));
    const category_id = Number(Object.keys(categoryMapping).find(key => categoryMapping[Number(key)] === select_Bussines_Category.value));

    // Logic for OrganizationType
    let created_type_id;

    try {
      const searchResponse = await axios.get('http://localhost:8000/organization/organizationtype/', {
        headers: { Authorization: `Bearer ${token}` },
        params: { name: SelectType.value }
      });

      const existingType = searchResponse.data.find((type: any) => type.name === SelectType.value);

      if (existingType) {
        created_type_id = existingType.id;
      }
    } catch (error) {
        console.log('Could not find existing organization type, will create a new one.');
    }

    if (!created_type_id) {
        const response_OrganizationType = await axios.post(
          'http://localhost:8000/organization/organizationtype/',
          {
            name: SelectType.value,
            description: description.value,
            category_organization_type: category_id
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        created_type_id = response_OrganizationType.data.id;
    }

    const organizationPayload = {
      name: Bussines_name.value,
      description: description.value,
      organization_size: size_id,
      organization_type: created_type_id,
      age: foundedYear.value,
      location: state_id
    };

    let response_organization;
    if (organization.value && organization.value.id) {
      response_organization = await axios.patch(
        `http://localhost:8000/organization/organization/${organization.value.id}/`,
        organizationPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      response_organization = await axios.post(
        'http://localhost:8000/organization/organization/',
        organizationPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    const organizationId = response_organization.data.id;
    organization.value = response_organization.data;
    organizationStore.setOrganizationId(organizationId);
    console.log('Organization saved successfully:', response_organization.data);
    
    return response_organization.data;
  };

  return {
    Bussines_name,
    selectedState,
    foundedYear,
    SelectType,
    select_Bussines_size,
    select_Bussines_Category,
    description,
    organization,
    fetchOrganizationData,
    saveOrganization
  };
}
