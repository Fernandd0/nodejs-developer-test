import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          username,
          password,
        });
        if (response.data.token) {
          this.isAuthenticated = true;
          this.user = username;
          this.token = response.data.token;
          localStorage.setItem("token", response.data.token);
        }
      } catch (error) {
        throw new Error("Login failed");
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
