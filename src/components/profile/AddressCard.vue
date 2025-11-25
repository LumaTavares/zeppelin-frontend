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

            <!-- FOUNDED YEAR EXIBINDO O VALOR DIGITADO -->
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
                {{ Selectname }}
              </p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Organization size</p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ select_Bussines_size }}
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

          <form class="flex flex-col">
            <div class="px-2 overflow-y-auto custom-scrollbar">
              <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                <!-- AQUI: INPUT COM V-MODEL nome -->

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Name
                  </label>
                  <input
                    type="text"
                    v-model="Bussines_name"
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                  />
                </div>

                <!-- AQUI: INPUT COM V-MODEL estado -->

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    City/State
                  </label>

                    <select v-model="selectedState"   class="h-11 rounded-lg border border-gray-300 px-3">
                      <option v-for="estado in estados" :key="estado" :value="estado">
                        {{ estado }}
                      </option>
                    </select>
                </div>

                <!-- AQUI: INPUT COM V-MODEL -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Founded year
                  </label>
                  <input
                    type="number"
                    v-model="foundedYear"
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Type of organization
                  </label>

                  <select v-model="Selectname"   class="h-11 rounded-lg border border-gray-300 px-3">
                    <option v-for="type in Type_Bussines" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Organization size
                  </label>

                  <select v-model="select_Bussines_size"   class="h-11 rounded-lg border border-gray-300 px-3">
                    <option v-for="size in Bussines_size" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>

                  
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
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white sm:w-auto"
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
import { ref } from 'vue'
import Modal from './Modal.vue'

const estados = ['ES','MG','RJ','SP','BA','CE','PE','RS','SC','PR']
const selectedState = ref('')

const Type_Bussines = ['Software Factory','Startup','Private Company with an IT Department','Single-product Software Company (e.g. Airbnb, Uber)']
const Selectname = ref('')

const Bussines_size=['01 to 09 employees','10 to 49 employees','50 to 99 employees','More than 99 employees']
const select_Bussines_size = ref('')


const foundedYear = ref(null)
const isProfileAddressModal = ref(false)

const saveProfile = () => {
  console.log("Founded year salvo:", foundedYear.value)
  isProfileAddressModal.value = false
}
</script>

<style></style>
