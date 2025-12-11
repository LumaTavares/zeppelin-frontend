<template>
  <div>
    <!-- AddressCard content -->
    <div v-if="showAddressCard" class="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">organization</h4>

          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Name</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ Bussines_name || organization.name }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">State</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ selectedState || stateMapping[organization.location] }}
              </p>
            </div>


            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Founded year
              </p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ foundedYear || organization.age }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Type of organization</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ SelectType || typeMapping[organization.organization_type] }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Category of organization</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ select_Bussines_Category || organization.description }}
              </p>
            </div>


            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Organization size</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ select_Bussines_size || sizeMapping[organization.organization_size] }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Description</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ description || organization.description }}
              </p>
            </div>
            
          </div>
        </div>

        <!-- Disable if organization.name exists -->
        <button
          @click="openEditModal"
          class="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          Edit
        </button>
      </div>
    </div>

    <!-- MODAL -->
    <Modal v-if="isProfileAddressModal" @close="isProfileAddressModal = false">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 z-50"
        >
          <button
            @click="isProfileAddressModal = false"
            class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
          >
            X
          </button>

          <div class="px-2 pr-14">
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Edit Address</h4>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>

          <form class="flex flex-col" ref="form">
            <div class="px-2 overflow-y-auto custom-scrollbar">
              <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                <!-- INPUT Nome -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Name
                  </label>
                  <input
                    id="nome"
                    type="text"
                    v-model="Bussines_name"
                    @input="$emit('update:businessName', Bussines_name)"
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                  />
                </div>

                <!-- SELECT Estado -  -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    City/State
                  </label>
                  <select 
                    id="estado" 
                    v-model="selectedState"  
                    class="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm"
                  >
                    <option value="" disabled>Select a state</option>
                    <option v-for="estado in organizationStates" :key="estado" :value="estado">
                      {{ estado }}
                    </option>
                  </select>
                </div>

                <!-- INPUT Founded Year -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Founded year
                  </label>
                  <input
                    id="anoFundacao"
                    type="number"
                    v-model="foundedYear"
                    placeholder="2020"
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                  />
                </div>

                <!-- SELECT Type - CORRIGIDO -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Type of organization
                  </label>
                  <select 
                    v-model="SelectType"   
                    class="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm"
                  >
                    <option value="" disabled>Select a type</option>
                    <option v-for="type in organizationTypes" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>
                </div>

                <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Category of organization
                </label>
                <select 
                  v-model="select_Bussines_Category"   
                  class="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm"
                >
                  <option value="" disabled>Category of organization</option>
                  <option v-for="categoria in organizationCategories" :key="categoria" :value="categoria">
                    {{ categoria }}
                  </option>
                </select>
              </div>

                <!-- SELECT Organization Size -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Organization size
                  </label>
                  <select 
                    id="tamanho" 
                    v-model="select_Bussines_size"   
                    class="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm"
                  >
                    <option value="" disabled>Select a size</option>
                    <option v-for="size in organizationSizes" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    v-model="description"
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                  />
                </div>

              </div>
            </div>

            <div class="flex items-center gap-3 mt-6 lg:justify-end">
              <button
                @click="isProfileAddressModal = false"
                type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm sm:w-auto"
              >
                Close
              </button>

              <button
                @click="proximatela"
                type="button"
                class="flex w-full justify-center rounded-lg border bg-brand-950   px-4 py-2.5 text-sm sm:w-auto hover:bg-brand-900"
              >
                Next Step
              </button>
              
            </div>

          </form>
        </div>
      </template>
    </Modal>

    <ConfirmationModal
      :show="showConfirmationModal"
      title="Confirmar Edição"
      message="Você tem certeza que deseja editar os dados da organização?"
      @confirm="handleConfirmEdit"
      @cancel="handleCancelEdit"
    />

  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import Modal from './Modal.vue';
import ConfirmationModal from './ConfirmationModal.vue';
import { useAuthStore } from '@/stores/auth';
import { useOrganizationProfile } from '@/composables/useOrganizationProfile';
import { 
  organizationCategories, 
  organizationStates, 
  organizationTypes, 
  organizationSizes,
  stateMapping, 
  typeMapping, 
  sizeMapping,
  categoryMapping 
} from '@/constants/profileOptions';

// Define props and emits
const emit = defineEmits([
  'update:businessName',
  'update:showPersonalInfoCard',
  'update:salvarorganização',
  'update:showAddressCard',
  'update:isProfileAddressModal'
]);

const props = defineProps({
  businessName: {
    type: String,
    default: ''
  },
  showPersonalInfoCard: {
    type: Boolean,
    default: false
  },
  salvarorganização: Boolean,
  showAddressCard: {
    type: Boolean,
    default: true
  },
  isProfileAddressModal: {
    type: Boolean,
    default: false
  }
});

// Local state
const showConfirmationModal = ref(false);

const isProfileAddressModal = computed({
  get: () => props.isProfileAddressModal,
  set: (val) => emit('update:isProfileAddressModal', val)
});

const showAddressCard = computed({
  get: () => props.showAddressCard,
  set: (val) => emit('update:showAddressCard', val)
});

const {
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
} = useOrganizationProfile()

const openEditModal = () => {
  if (organization.value && organization.value.id) {
    showConfirmationModal.value = true
  } else {
    isProfileAddressModal.value = true
  }
};

const handleConfirmEdit = () => {
  showConfirmationModal.value = false
  isProfileAddressModal.value = true
};

const handleCancelEdit = () => {
  showConfirmationModal.value = false
};

// Reset form when modal opens
watch(isProfileAddressModal, (newVal) => {
  if (newVal && organization.value.id) {
    Bussines_name.value = organization.value.name || ''
    selectedState.value = stateMapping[organization.value.location] || ''
    foundedYear.value = organization.value.age || null
    select_Bussines_size.value = sizeMapping[organization.value.organization_size] || ''
    description.value = organization.value.description || ''
    
    if (organization.value.organization_type_details) {
       SelectType.value = organization.value.organization_type_details.name || ''
    }
  }
});

const auth = useAuthStore();
const userEmail = computed(() => auth.user?.email)

// Watch for changes in showPersonalInfoCard prop to hide/show AddressCard
watch(() => props.showPersonalInfoCard, (newVal) => {
  showAddressCard.value = !newVal
});

// Watch for changes in showPersonalInfoCard prop to hide/show AddressCard
watch(() => props.showPersonalInfoCard, (newVal) => {
  showAddressCard.value = !newVal
});

// Function to update and emit showPersonalInfoCard
const updateShowPersonalInfoCard = (value) => {
emit('update:showPersonalInfoCard', value)
};

const proximatela = async () => {
  try {
    await saveOrganization()
    if (organization.value && organization.value.id) {
      showAddressCard.value = false
      isProfileAddressModal.value = false
      updateShowPersonalInfoCard(true)
    }
  } catch (error) {
    console.error('Error saving organization:', error);
    alert(error.message || 'Error saving profile')
  }
};

// Watch for prop changes
watch(() => props.businessName, (newVal) => {
  if (newVal) Bussines_name.value = newVal
});

watch(Bussines_name, (newVal) => {
  emit('update:businessName', newVal)
});

// Watch for changes in salvarorganização prop
watch(() => props.salvarorganização, async (newVal) => {
  if (newVal) {
    try {
      await saveOrganization();
    } catch (error) {
      console.error('Error saving organization:', error)
    } finally {
      emit('update:salvarorganização', false)
    }
  }
});

watch(userEmail, (newEmail) => {
  if (newEmail) {
    fetchOrganizationData(newEmail)
  }
}, { immediate: true })

</script>