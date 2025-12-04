<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"
    >
      <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Profile</h3>
      <profile-card />
      <address-card 
        v-model:businessName="organizationName" 
        v-model:showPersonalInfoCard="personainfoshow"
        v-model:salvarorganização="salvarorganização"
        />
      <personal-info-card 
        v-model:organizationName="organizationName" 
        v-model:showPersonalInfoCard="personainfoshow"
        v-model:salvarorganização="salvarorganização"
        />
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '../../components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import { ref } from 'vue'
import AddressCard from '../../components/profile/AddressCard.vue'
import PersonalInfoCard from '../../components/profile/PersonalInfoCard.vue' //importar componente
import ProfileCard from '../../components/profile/ProfileCard.vue'
const currentPageTitle = ref('User Profile')

//compartilhar nome da organização
const organizationName = ref('') //constante pro nome da organização
const personainfoshow = ref(false) //variável que to bizoaiando 
const salvarorganização = ref(false)
 
</script>