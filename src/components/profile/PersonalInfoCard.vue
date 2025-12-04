<template>
  <div>
    <div v-if="showcard" class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{userEmail}}
              </p>
            </div>
            
            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Organization Name</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ props.organizationName }}</p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Academic Degree</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">{{ selectAcademicDegree }}</p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Academic Degree Status</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ AcademicDegreeName }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Academic Degree Status</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ SelectAcademicDegreeStatus }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Experience Level</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ selectExperienceLevel }}
              </p>
            </div> 
            
            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Position Level</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ SelectPositionLevel }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Role</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ role }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Knowledge Level</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ SelectKnwoledge_level }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Employee Experience Level</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ SelectEmployee_experience_level }}
              </p>
            </div>


          </div>
        </div>

        <button class="edit-button" @click="isProfileInfoModal = true ">
          <svg
            class="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>
    </div>
    <Modal v-if="isProfileInfoModal" @close="isProfileInfoModal = false">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
        >
          <!-- close btn -->
          <button
            @click="isProfileInfoModal = false"
            class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
          >
            <svg
              class="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                fill=""
              />
            </svg>
          </button>
          <div class="px-2 pr-14">
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form class="flex flex-col">
            <div class="custom-scrollbar max-h-[700px] overflow-y-auto p-2">
              
              <div class="mt-7">
                <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  


                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Email Address
                    </label>
                    <input
                      type="Email"
                      disabled
                      :value="userEmail"
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div>
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Degree name 
                    </label>
                    <input
                      type="text"
                      v-model="AcademicDegreeName"
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Academic Degree
                    </label>
                    <select
                      v-model="selectAcademicDegree"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option
                        v-for="degree in academicDegrees"
                        :key="degree"
                        :value="degree"
                      >
                        {{ degree }}
                      </option>
                    </select>
                
                  </div>

                  <div class="col-span-2">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Academic Degree Status
                    </label>
                    <select
                      v-model="selectAcademicDegreeStatus"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option
                        v-for="status in academicDegreeStatuses"
                        :key="status.value"
                        :value="status.label"
                      >
                        {{ status.label }}
                      </option>
                    </select>
                    
                  </div>

                  <div>
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Experience Level
                    </label>
                    <select
                      v-model="selectExperienceLevel"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option
                        v-for="level in experienceLevels"
                        :key="level"
                        :value="level"
                      >
                        {{ level }}
                      </option>
                    </select>

                  </div>

                  <div>
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Position Level
                    </label>
                    <select
                      v-model="SelectPositionLevel"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option
                        v-for="position in positionLevels"
                        :key="position"
                        :value="position"
                      >
                        {{ position }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      v-model="role"
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div>
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Knowledge Level
                    </label>
                    <select
                      v-model="SelectKnwoledge_level"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option
                        v-for="knowledge in knowledgeLevels"
                        :key="knowledge"
                        :value="knowledge"
                      >
                        {{ knowledge }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Employee Experience Level
                    </label>
                    <select
                      v-model="SelectEmployee_experience_level"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option
                        v-for="experience in employeeExperienceLevels"
                        :key="experience"
                        :value="experience"
                      >
                        {{ experience }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button
                @click="isProfileInfoModal = false"
                type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Close
              </button>


              <button
                @click="saveProfile"
                type="button"
                class="flex w-full justify-center rounded-lg bg-brand-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-900 sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import Modal from './Modal.vue';
import { ref, onMounted, computed, watch, defineProps, defineEmits } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useOrganizationStore } from '@/stores/organization';
import { api } from '@/services/api';

const props = defineProps({
  organizationName: String,
  showPersonalInfoCard: Boolean,
  salvarorganização: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:salvarorganização']);

const auth = useAuthStore();
const organizationStore = useOrganizationStore();
const showcard = ref(false);
const selectAcademicDegree = ref('');
const AcademicDegreeName = ref('');
const selectAcademicDegreeStatus = ref('');
const selectExperienceLevel = ref('');
const selectPositionLevel = ref('');
const role = ref('');
const selectKnowledgeLevel = ref('');
const selectEmployeeExperienceLevel = ref('');

// Listas
const academicDegrees = [
  "Secondary Education",
  "Undergraduate",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
];

const academicDegreeStatuses = [
  { label: "In Progress", value: 1 },
  { label: "Completed", value: 2 },
];

const experienceLevels = ["Junior", "Mid-level", "Senior"];
const positionLevels = [
  "Project Manager",
  "Scrum Master",
  "Product Owner",
  "Developer",
  "Technical Lead",
  "Director",
];
const knowledgeLevels = ["Beginner", "Intermediate", "Advanced"];
const employeeExperienceLevels = ["Beginner", "Intermediate", "Advanced"];

watch(
  () => props.showPersonalInfoCard,
  (newVal) => {
    if (newVal) {
      showcard.value = true;
      isProfileInfoModal.value = true;
    } else {
      showcard.value = false;
      isProfileInfoModal.value = false;
    }
  }
);

watch(
  () => props.salvarorganização,
  (newVal) => {
    if (newVal) {
      saveProfile();
    }
  }
);

const userEmail = computed(() => auth.user?.email || 'email@exemplo.com');
const isProfileInfoModal = ref(false);

const saveProfile = async () => {
  try {
    emit('update:salvarorganização', true);
    
    const employeeResponse = await api.post(
      '/employee/employee/',
      {
        e_mail: userEmail.value,
        role: role.value,
        employee_position: selectPositionLevel.value,
        employee_organization: organizationStore.organizationId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    console.log('Perfil salvo com sucesso:', employeeResponse.data);

    const employeeId = employeeResponse.data.id;

    const academicDegreeResponse = await api.post(
      '/employee/academicdegree/',
      {
        degree_name: selectAcademicDegree.value,
        degree_type: selectAcademicDegree.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    console.log('Grau acadêmico salvo com sucesso:', academicDegreeResponse.data);

    const academicDegreeId = academicDegreeResponse.data.id;

    const academicDegreeStatusId = academicDegreeStatuses.find(
      (status) => status.label === selectAcademicDegreeStatus.value
    )?.value;

    const employeeKnowledgeResponse = await api.post(
      '/employee/employeeknowledge/',
      {
        academic_degree: academicDegreeId,
        academic_degree_status: academicDegreeStatusId,
        employee: employeeId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    console.log('Conhecimento do funcionário salvo com sucesso:', employeeKnowledgeResponse.data);

    isProfileInfoModal.value = false;
    emit('update:salvarorganização', false);
  } catch (error) {
    console.error('Erro ao salvar perfil ou conhecimento:', error);
    if (error.response) {
      console.error('Erro no backend:', error.response.data);
    } else {
      console.error('Erro na requisição:', error.message);
    }
    emit('update:salvarorganização', false);
  }
};
</script>