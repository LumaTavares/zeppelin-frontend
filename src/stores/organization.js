import { defineStore } from 'pinia';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organizationId: null, // ID da organização
  }),
  actions: {
    setOrganizationId(id) {
      this.organizationId = id;
    },
  },
});