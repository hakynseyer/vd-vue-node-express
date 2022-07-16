import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    user: {
      name: "",
      surnameFirst: "",
      rank: "",
    },
    token: null,
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ["user"],
      },
      { storage: localStorage, paths: ["token"] },
    ],
  },
});
