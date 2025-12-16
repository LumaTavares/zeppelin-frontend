import { ref } from 'vue'
import axios from 'axios'
import { 
  academicDegreeStatuses,
  academicDegrees,
  academicDegreeMapping,
  idToAcademicDegreeMapping,
  idToPositionMapping,
  positionLevels as positionLevelsConst,
  positionMapping as positionMappingConst,
} from '@/constants/profileOptions'

export function useEmployeeProfile() {
  const selectAcademicDegree = ref('')
  const selectAcademicDegreeStatus = ref('')
  const selectPositionLevel = ref('')
  const role = ref('')
  const employeeId = ref(null)
  const knowledgeId = ref(null)

  // Use static position levels from constants
  const positionLevels = positionLevelsConst;

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
        // Map ID to English label for display using imported mapping
        if (employee.employee_position) {
            const positionIdValue = typeof employee.employee_position === 'object' 
                ? employee.employee_position.id 
                : employee.employee_position;
            selectPositionLevel.value = idToPositionMapping[positionIdValue as keyof typeof idToPositionMapping] || ''
            console.log(`Position ID ${positionIdValue} mapped to: ${selectPositionLevel.value}`);
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
                    // Try to match by ID first
                    if (statusVal.id) {
                        const statusObj = academicDegreeStatuses.find(s => s.value == statusVal.id)
                        if (statusObj) {
                            selectAcademicDegreeStatus.value = statusObj.label
                        }
                    }
                    // If not matched by ID, try name/label directly
                    if (!selectAcademicDegreeStatus.value && statusVal.name) {
                         selectAcademicDegreeStatus.value = statusVal.name
                    }
                } else {
                    // Handle primitive value (ID)
                    const statusObj = academicDegreeStatuses.find(s => s.value == statusVal);
                    if (statusObj) {
                        selectAcademicDegreeStatus.value = statusObj.label
                    }
                }

                // Populate Academic Degree - CORRIGIDO
                let degreeId = null
                let degreeName = null
                
                if (knowledgeEntry.academic_degree) {
                    if (typeof knowledgeEntry.academic_degree === 'object') {
                        degreeId = knowledgeEntry.academic_degree.id
                        // Tenta pegar o nome de diferentes campos possíveis
                        degreeName = knowledgeEntry.academic_degree.degree_name 
                                  || knowledgeEntry.academic_degree.name 
                                  || knowledgeEntry.academic_degree.label
                    } else {
                        degreeId = knowledgeEntry.academic_degree
                    }
                    
                    // Se temos o nome direto, usa
                    if (degreeName && academicDegrees.includes(degreeName)) {
                        selectAcademicDegree.value = degreeName
                        console.log(`Academic Degree name found: ${degreeName}`);
                    } 
                    // Senão, tenta mapear pelo ID
                    else if (degreeId && idToAcademicDegreeMapping[degreeId]) {
                        selectAcademicDegree.value = idToAcademicDegreeMapping[degreeId]
                        console.log(`Academic Degree ID ${degreeId} mapped to: ${selectAcademicDegree.value}`);
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
      
      if (selectPositionLevel.value) {
        positionId = positionMappingConst[selectPositionLevel.value as keyof typeof positionMappingConst];
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
        academicDegreeId = academicDegreeMapping[selectAcademicDegree.value];
        console.log(`Academic Degree: "${selectAcademicDegree.value}" -> ID: ${academicDegreeId}`);
      }
      
      const academicDegreeStatusId = academicDegreeStatuses.find(s => s.label === selectAcademicDegreeStatus.value)?.value;
      console.log(`Academic Degree Status: "${selectAcademicDegreeStatus.value}" -> ID: ${academicDegreeStatusId}`);

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
    academicDegrees,
    academicDegreeStatuses,
    fetchEmployeeData,
    saveProfile
  };
}
