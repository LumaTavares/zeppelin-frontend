<template>
  <div>
    <div class="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">organization</h4>

          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Name</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ Bussines_name }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">State</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ selectedState }}
              </p>
            </div>


            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Founded year
              </p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ foundedYear }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Type of organization</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ SelectType }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Category of organization</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ select_Bussines_Category }}
              </p>
            </div>


            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Organization size</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ select_Bussines_size }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Description</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ description }}
              </p>
            </div>
            
          </div>
        </div>

        <button
          @click="isProfileAddressModal = true"
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
          class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
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

                <!-- SELECT Estado - CORRIGIDO -->
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
                    <option v-for="estado in estados" :key="estado" :value="estado">
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
                    <option v-for="type in Type_Bussines" :key="type" :value="type">
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
                  <option v-for="categoria in category" :key="categoria" :value="categoria">
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
                    <option v-for="size in Bussines_size" :key="size" :value="size">
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
                @click="saveProfile"
                type="button"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white sm:w-auto hover:bg-brand-600"
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
import { onMounted, ref } from 'vue'
import Modal from './Modal.vue'
import axios from 'axios'

// campos do forms com v-model
const Bussines_name = ref('')
const selectedState = ref('')
const foundedYear = ref(null)
const SelectType = ref('')
const select_Bussines_size = ref('')
const select_Bussines_Category = ref('')
const description = ref('')

// listas do select

const category= [
  'Finance',
  'Health',
  'Education',
  'Technology',
  'Retail',
  'Manufacturing'
]
const estados = ['ES','RJ','SP']

const Type_Bussines = [
  'Factory',
  'Startup',
  'Private Company with an IT Department',
  'Single-product Software Company (e.g. Airbnb, Uber)'
]

const Bussines_size = [
  '01 to 09 employees',
  '10 to 49 employees',
  '50 to 99 employees',
  'More than 99 employees'
]

// DICIONÁRIOS PARA MAPEAR VALORES PARA IDs - CORRIGIDO
const dict_size = {
  1: '01 to 09 employees',
  2: '10 to 49 employees',
  3: '50 to 99 employees',
  4: 'More than 99 employees'
}

const dict_type = {
  1: 'Software Factory',
  2: 'Startup',
  3: 'Private Company with an IT Department',
  4: 'Single-product Software Company (e.g. Airbnb, Uber)'
}

const dict_estados = {
  1: 'ES',
  2: 'RJ',
  3: 'SP'
}

//mudar isso depois NAO ESQUECEEEEEEEERRRRRRRRRRRR
const dict_category = {
  6: 'Finance',
  7: 'Health',
  8: 'Education',
  9: 'Technology',
  10: 'Retail',
  11: 'Manufacturing'
}

// modal
const isProfileAddressModal = ref(false)

const saveProfile = async () => {
  const token = localStorage.getItem("access_token");

  try {
    // Validação básica
    if (!Bussines_name.value || !selectedState.value || !foundedYear.value || !SelectType.value || !select_Bussines_size.value || !select_Bussines_Category.value)
 {
      alert('Please fill all fields');
      return;
    }

    // pega os IDs
    const size_id = Number(
      Object.keys(dict_size).find(key => dict_size[key] === select_Bussines_size.value)
    );

    const state_id = Number(
      Object.keys(dict_estados).find(key => dict_estados[key] === selectedState.value)
    );

    const category_id = Number(
      Object.keys(dict_category).find(key => dict_category[key] === select_Bussines_Category.value)
    );

    // PRIMEIRO: Cria o OrganizationType
    const response_OrganizationType = await axios.post(
      "http://localhost:8000/organization/organizationtype/",
      {
        name: SelectType.value,
        description: description.value,
        category_organization_type: category_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // PEGA O ID RETORNADO (geralmente vem em response.data.id)
    const created_type_id = response_OrganizationType.data.id;
    console.log('Type criado com ID:', created_type_id);

    // SEGUNDO: Cria a Organization usando o ID do tipo criado
    const response_organization = await axios.post(
      "http://localhost:8000/organization/organization/",
      {
        name: Bussines_name.value,
        description: description.value,
        organization_size: size_id,
        organization_type: created_type_id,  // ← USA O ID RETORNADO AQUI
        age: foundedYear.value,
        location: state_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log('Success:', response_organization.data);
    
    // Fechar modal após sucesso
    isProfileAddressModal.value = false;
    alert('Profile saved successfully!');

  } catch (error) {
    console.error("Erro ao salvar:", error.response?.data);
    alert('Error saving profile. Check console for details.');
  }
};
</script>