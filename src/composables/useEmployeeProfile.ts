import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useProfileOptions } from '@/composables/useProfileOptions'

export function useEmployeeProfile() {
  const selectAcademicDegree = ref<string | number>('')
  const selectAcademicDegreeStatus = ref<string | number>('')
  const selectPositionLevel = ref('')
  const role = ref('')
  const employeeId = ref(null)
  const knowledgeId = ref(null)

  // Load dynamic options from backend
  const { academicDegrees: academicDegreesData, academicDegreeStatuses: statusesData, positions: positionsData, loadAll } = useProfileOptions()

  // Create computed property for position levels from dynamic data
  const positionLevels = computed(() => 
    positionsData.value.map((p: any) => p.name)
  )

  // Load options on mount
  onMounted(async () => {
    await loadAll()
  })

  const fetchEmployeeData = async (userEmail: string) => {
    const token = localStorage.getItem('access_token')
    if (!token || !userEmail) return

    // Reset IDs
    employeeId.value = null
    knowledgeId.value = null

    try {
      let allEmployees: any[] = []
      let currentPage = 1
      let totalPages = 1

      // Initial request
      const initialResponse = await axios.get('http://localhost:8000/employee/employee/', {
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
        const response = await axios.get('http://localhost:8000/employee/employee/', {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: currentPage }
        });
        
        const employeesOnPage = response.data?.data;
        if (Array.isArray(employeesOnPage)) {
          allEmployees = allEmployees.concat(employeesOnPage)
        }
      }

      const employee = allEmployees.find((e: any) => e.e_mail && e.e_mail.toLowerCase() === userEmail.toLowerCase())
      console.log('Employee found:', employee);
      
      if (employee) {
        employeeId.value = employee.id
        role.value = employee.role || ''
        // Map ID to position name from dynamic data
        if (employee.employee_position && positionsData.value.length > 0) {
            const positionIdValue = typeof employee.employee_position === 'object' 
                ? employee.employee_position.id 
                : employee.employee_position;
            const foundPosition = positionsData.value.find((p: any) => p.id === positionIdValue)
            if (foundPosition) {
                selectPositionLevel.value = foundPosition.name
                console.log(`Position ID ${positionIdValue} mapped to: ${foundPosition.name}`);
            } else {
                console.warn(`Position ID ${positionIdValue} not found`);
            }
        }
        
        // Fetch Employee Knowledge to populate Academic Degree and Status
        try {
            const knowledgeResponse = await axios.get('http://localhost:8000/employee/employeeknowledge/', {
                headers: { Authorization: `Bearer ${token}` },
                params: { employee: employee.id }
            });
            
            console.log('Knowledge Response:', knowledgeResponse.data)

            let knowledgeList: any[] = [];
            if (Array.isArray(knowledgeResponse.data)) {
                knowledgeList = knowledgeResponse.data
            } else if (knowledgeResponse.data?.data && Array.isArray(knowledgeResponse.data.data)) {
                knowledgeList = knowledgeResponse.data.data
            } else if (knowledgeResponse.data?.results && Array.isArray(knowledgeResponse.data.results)) {
                knowledgeList = knowledgeResponse.data.results
            }

            // Find the knowledge entry for this employee (handle object or ID)
            const knowledgeEntry = knowledgeList.find((k: any) => {
                const kEmpId = (k.employee && typeof k.employee === 'object') ? k.employee.id : k.employee
                return kEmpId === employee.id
            });

            if (knowledgeEntry) {
                knowledgeId.value = knowledgeEntry.id
                // Populate Academic Degree Status
                let statusVal = knowledgeEntry.academic_degree_status
                
                // Handle case where status is an object (e.g. {id: 1, name: 'In Progress'})
                if (statusVal && typeof statusVal === 'object') {
                    // Assign the ID directly
                    if (statusVal.id) {
                        selectAcademicDegreeStatus.value = statusVal.id
                    }
                } else if (statusVal) {
                    // Handle primitive value (ID) - assign directly
                    selectAcademicDegreeStatus.value = statusVal
                }

                // Populate Academic Degree - CORRIGIDO
                let degreeId: number | null = null
                let degreeName: string | null = null
                
                if (knowledgeEntry.academic_degree) {
                    if (typeof knowledgeEntry.academic_degree === 'object') {
                        degreeId = knowledgeEntry.academic_degree.id
                        degreeName = knowledgeEntry.academic_degree.name 
                    } else {
                        degreeId = knowledgeEntry.academic_degree
                    }
                    
                    // Procura no array dinâmico de academicDegrees
                    if (degreeName && academicDegreesData.value.length > 0) {
                        const foundDegree = academicDegreesData.value.find((d: any) => d.name === degreeName)
                        if (foundDegree) {
                            selectAcademicDegree.value = foundDegree.id
                            console.log(`Academic Degree name found: ${degreeName} (ID: ${foundDegree.id})`);
                        }
                    }
                    // Senão, procura pelo ID no array dinâmico
                    else if (degreeId && academicDegreesData.value.length > 0) {
                        const foundDegree = academicDegreesData.value.find((d: any) => d.id === degreeId)
                        if (foundDegree) {
                            selectAcademicDegree.value = foundDegree.id
                            console.log(`Academic Degree ID ${degreeId} mapped to: ${foundDegree.name}`);
                        }
                    } else {
                        console.warn(`Could not map academic degree. ID: ${degreeId}, Name: ${degreeName}`);
                    }
                }
            } else {
               console.log('No knowledge entry found for employee ID:', employee.id)
            }
        } catch (error) {
            console.error('Error fetching employee knowledge:', error)
        }
      }
    } catch (error) {
      console.error('Error fetching employee data:', error)
    }
  };

  const saveProfile = async (userEmail: string, organizationId: number | string, shouldSaveOrganization: boolean = true) => {
    const token = localStorage.getItem('access_token')
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    try {
      // Step 1: Save or update Employee
      let employeeResponse;
      let positionId = null;
      
      if (selectPositionLevel.value && positionsData.value.length > 0) {
        const foundPosition = positionsData.value.find((p: any) => p.name === selectPositionLevel.value)
        positionId = foundPosition?.id
        console.log(`Position: "${selectPositionLevel.value}" -> ID: ${positionId}`);
      }
      
      const employeePayload = {
        e_mail: userEmail,
        role: role.value,
        employee_position: positionId,
        employee_organization: shouldSaveOrganization ? organizationId : undefined,
      };

      console.log('Saving Employee with payload:', employeePayload);

      if (employeeId.value) {
        employeeResponse = await axios.patch(
          `http://localhost:8000/employee/employee/${employeeId.value}/`,
          employeePayload,
          { headers }
        );
        console.log('Employee updated:', employeeResponse.data);
      } else {
        employeeResponse = await axios.post(
          'http://localhost:8000/employee/employee/',
          employeePayload,
          { headers }
        );
        console.log('Employee created:', employeeResponse.data);
      }

      employeeId.value = employeeResponse.data.id;

      // Step 2: Save or update EmployeeKnowledge
      let academicDegreeId = null;
      if (selectAcademicDegree.value) {
        // selectAcademicDegree.value is already an ID
        academicDegreeId = selectAcademicDegree.value
        console.log(`Academic Degree ID: ${academicDegreeId}`);
      }
      
      let academicDegreeStatusId = null;
      if (selectAcademicDegreeStatus.value) {
        // selectAcademicDegreeStatus.value is already an ID
        academicDegreeStatusId = selectAcademicDegreeStatus.value
        console.log(`Academic Degree Status ID: ${academicDegreeStatusId}`);
      }

      const knowledgePayload = {
        academic_degree: academicDegreeId,
        academic_degree_status: academicDegreeStatusId,
        employee: employeeId.value,
      };

      console.log('Saving EmployeeKnowledge with payload:', knowledgePayload);

      let employeeKnowledgeResponse;
      if (knowledgeId.value) {
        employeeKnowledgeResponse = await axios.patch(
          `http://localhost:8000/employee/employeeknowledge/${knowledgeId.value}/`,
          knowledgePayload,
          { headers }
        );
        console.log('EmployeeKnowledge updated:', employeeKnowledgeResponse.data);
      } else {
        employeeKnowledgeResponse = await axios.post(
          'http://localhost:8000/employee/employeeknowledge/',
          knowledgePayload,
          { headers }
        );
        console.log('EmployeeKnowledge created:', employeeKnowledgeResponse.data);
      }

      if (employeeKnowledgeResponse.data && employeeKnowledgeResponse.data.id) {
        knowledgeId.value = employeeKnowledgeResponse.data.id;
      }
      
      console.log('Profile saved successfully!');
      return employeeResponse.data;
      
    } catch (error: any) {
      console.error('Error saving profile:', error.response?.data || error.message);
      throw error;
    }
  };

  return {
    selectAcademicDegree,
    selectAcademicDegreeStatus,
    selectPositionLevel,
    role,
    employeeId,
    knowledgeId,
    positionLevels,
    academicDegrees: academicDegreesData,
    academicDegreeStatuses: statusesData,
    positions: positionsData,
    fetchEmployeeData,
    saveProfile
  };
}
