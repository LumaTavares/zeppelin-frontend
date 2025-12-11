import { ref } from 'vue';
import axios from 'axios';
import { 
  academicDegreeStatuses
} from '@/constants/profileOptions';

export function useEmployeeProfile() {
  const selectAcademicDegree = ref('');
  const AcademicDegreeName = ref('');
  const selectAcademicDegreeStatus = ref('');
  const selectExperienceLevel = ref('');
  const selectPositionLevel = ref('');
  const role = ref('');
  const selectKnowledgeLevel = ref('');
  const selectEmployeeExperienceLevel = ref('');
  const employeeId = ref(null);
  const knowledgeId = ref(null);

  const positionLevels = ref<string[]>([]);
  const positionMapping = ref<Record<string, number>>({});
  const idToPositionMapping = ref<Record<number, string>>({});

  const fetchPositions = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get('http://localhost:8000/employee/position/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const positions = response.data?.results || response.data?.data || response.data || [];
      
      positionLevels.value = [];
      positionMapping.value = {};
      idToPositionMapping.value = {};

      positions.forEach((pos: any) => {
        if (pos.name && pos.id) {
          positionLevels.value.push(pos.name);
          positionMapping.value[pos.name] = pos.id;
          idToPositionMapping.value[pos.id] = pos.name;
        }
      });
      console.log('Positions fetched:', positionMapping.value);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const fetchEmployeeData = async (userEmail: string) => {
    const token = localStorage.getItem('access_token');
    if (!token || !userEmail) return;

    // Ensure positions are loaded
    if (positionLevels.value.length === 0) {
        await fetchPositions();
    }

    // Reset IDs
    employeeId.value = null;
    knowledgeId.value = null;

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
      console.log('Employee found:', employee);
      
      if (employee) {
        employeeId.value = employee.id;
        role.value = employee.role || '';
        // Map ID to English label for display
        if (employee.employee_position) {
            selectPositionLevel.value = idToPositionMapping.value[employee.employee_position] || '';
        }
        
        // Fetch Employee Knowledge to populate Academic Degree and Status
        try {
            const knowledgeResponse = await axios.get('http://localhost:8000/employee/employeeknowledge/', {
                headers: { Authorization: `Bearer ${token}` },
                params: { employee: employee.id }
            });
            
            console.log('Knowledge Response:', knowledgeResponse.data);

            let knowledgeList: any[] = [];
            if (Array.isArray(knowledgeResponse.data)) {
                knowledgeList = knowledgeResponse.data;
            } else if (knowledgeResponse.data?.data && Array.isArray(knowledgeResponse.data.data)) {
                knowledgeList = knowledgeResponse.data.data;
            } else if (knowledgeResponse.data?.results && Array.isArray(knowledgeResponse.data.results)) {
                knowledgeList = knowledgeResponse.data.results;
            }

            // Find the knowledge entry for this employee (handle object or ID)
            const knowledgeEntry = knowledgeList.find((k: any) => {
                const kEmpId = (k.employee && typeof k.employee === 'object') ? k.employee.id : k.employee;
                return kEmpId === employee.id;
            });

            if (knowledgeEntry) {
                knowledgeId.value = knowledgeEntry.id;
                // Populate Academic Degree Status
                let statusVal = knowledgeEntry.academic_degree_status;
                
                // Handle case where status is an object (e.g. {id: 1, name: 'In Progress'})
                if (statusVal && typeof statusVal === 'object') {
                    // Try to match by ID first
                    if (statusVal.id) {
                        const statusObj = academicDegreeStatuses.find(s => s.value == statusVal.id);
                        if (statusObj) {
                            selectAcademicDegreeStatus.value = statusObj.label;
                        }
                    }
                    // If not matched by ID, try name/label directly
                    if (!selectAcademicDegreeStatus.value && statusVal.name) {
                         selectAcademicDegreeStatus.value = statusVal.name;
                    }
                } else {
                    // Handle primitive value (ID)
                    const statusObj = academicDegreeStatuses.find(s => s.value == statusVal);
                    if (statusObj) {
                        selectAcademicDegreeStatus.value = statusObj.label;
                    }
                }

                // Populate Academic Degree
                let degreeId = null;
                if (knowledgeEntry.academic_degree && typeof knowledgeEntry.academic_degree === 'object') {
                    degreeId = knowledgeEntry.academic_degree.id;
                    // Check for 'degree_name' OR 'name'
                    const dName = knowledgeEntry.academic_degree.degree_name || knowledgeEntry.academic_degree.name;
                    if (dName) {
                         selectAcademicDegree.value = dName;
                         AcademicDegreeName.value = dName;
                    }
                } else {
                    degreeId = knowledgeEntry.academic_degree;
                }

                if (degreeId && !selectAcademicDegree.value) {
                    try {
                        const degreeResponse = await axios.get(`http://localhost:8000/employee/academicdegree/${degreeId}/`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        if (degreeResponse.data) {
                            // Check for degree_name or name in the response
                            const fetchedName = degreeResponse.data.degree_name || degreeResponse.data.name;
                            if (fetchedName) {
                                selectAcademicDegree.value = fetchedName;
                                AcademicDegreeName.value = fetchedName;
                            }
                        }
                    } catch (e) {
                        console.error("Error fetching degree details", e);
                    }
                }
            } else {
               console.log('No knowledge entry found for employee ID:', employee.id);
            }
        } catch (error) {
            console.error('Error fetching employee knowledge:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const saveProfile = async (userEmail: string, organizationId: number | string) => {
    const token = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    let employeeResponse;
    const payload = {
      e_mail: userEmail,
      role: role.value,
      employee_position: positionMapping.value[selectPositionLevel.value],
      employee_organization: organizationId,
    };

    console.log('Payload being sent:', payload);
    console.log('Saving profile. Employee ID:', employeeId.value);

    try {
      if (employeeId.value) {
        employeeResponse = await axios.patch(
          `http://localhost:8000/employee/employee/${employeeId.value}/`,
          payload,
          { headers }
        );
      } else {
        employeeResponse = await axios.post(
          'http://localhost:8000/employee/employee/',
          payload,
          { headers }
        );
      }
    } catch (error: any) {
      console.error('Error saving employee:', error.response?.data);
      throw error;
    }
    console.log('Perfil salvo com sucesso:', employeeResponse.data);

    employeeId.value = employeeResponse.data.id;

    const academicDegreeResponse = await axios.post(
      'http://localhost:8000/employee/academicdegree/',
      {
        degree_name: selectAcademicDegree.value,
        degree_type: selectAcademicDegree.value,
      },
      { headers }
    );
    console.log('Grau acadêmico salvo com sucesso:', academicDegreeResponse.data);

    const academicDegreeId = academicDegreeResponse.data.id;

    const academicDegreeStatusId = academicDegreeStatuses.find(
      (status) => status.label === selectAcademicDegreeStatus.value
    )?.value;

    let employeeKnowledgeResponse;
    const knowledgePayload = {
        academic_degree: academicDegreeId,
        academic_degree_status: academicDegreeStatusId,
        employee: employeeId.value,
    };

    if (knowledgeId.value) {
        employeeKnowledgeResponse = await axios.patch(
            `http://localhost:8000/employee/employeeknowledge/${knowledgeId.value}/`,
            knowledgePayload,
            { headers }
        );
    } else {
        employeeKnowledgeResponse = await axios.post(
            'http://localhost:8000/employee/employeeknowledge/',
            knowledgePayload,
            { headers }
        );
    }
    console.log('Conhecimento do funcionário salvo com sucesso:', employeeKnowledgeResponse.data);
    if (employeeKnowledgeResponse.data && employeeKnowledgeResponse.data.id) {
        knowledgeId.value = employeeKnowledgeResponse.data.id;
    }
    
    return employeeResponse.data;
  };

  return {
    selectAcademicDegree,
    AcademicDegreeName,
    selectAcademicDegreeStatus,
    selectExperienceLevel,
    selectPositionLevel,
    role,
    selectKnowledgeLevel,
    selectEmployeeExperienceLevel,
    employeeId,
    knowledgeId,
    positionLevels,
    fetchEmployeeData,
    saveProfile
  };
}
