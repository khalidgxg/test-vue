import { defineStore } from 'pinia'

export const useListsStore = defineStore('lists', {
  state: () => ({
    users: [],
    transactions: [],
    accounts: [],
    cards: [],
    notifications: [],
  }),
  actions: {
    async fetchUsers(payload = {}) {
      const query = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => !!value),
      )
      const response = await sendApiRequest('/users', query)
      this.users = (response && response.data) || []
    },
    async fetchTransactions(payload = {}) {
      const query = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => !!value),
      )
      const response = await sendApiRequest('/transactions', query)
      this.transactions = (response && response.data) || []
    },
  },
  persist: true,
})
