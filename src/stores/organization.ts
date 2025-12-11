import { defineStore } from 'pinia';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organizationId: null as number | null, // ID da organização
  }),
  actions: {
    setOrganizationId(id: number) {
      this.organizationId = id;
    },
  },
});