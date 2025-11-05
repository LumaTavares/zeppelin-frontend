<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="pageTitle" />

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="space-y-6">
        <ComponentCard v-for="(group, i) in leftGroups" :key="i" :title="group.title">
          <component :is="group.component" v-bind="group.props" />
        </ComponentCard>
      </div>

      <div class="space-y-6">
        <ComponentCard v-for="(group, i) in rightGroups" :key="i" :title="group.title">
          <component :is="group.component" v-bind="group.props" />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'

  
interface GroupConfig {
  title: string
  component: any
  props?: Record<string, any>
}

defineProps<{
  pageTitle: string
  leftGroups: GroupConfig[]
  rightGroups: GroupConfig[]
}>()
</script>
