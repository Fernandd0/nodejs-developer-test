<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-sm">
      <h2 class="text-2xl font-medium text-gray-900 mb-8 text-center">Login</h2>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label class="sr-only">Username</label>
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200 bg-gray-100"
          />
        </div>
        <div>
          <label class="sr-only">Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200 bg-gray-100"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async login() {
      try {
        await this.authStore.login(this.username, this.password);
        this.$router.push("/dashboard");
      } catch (error) {
        alert("Login failed. Please check your credentials.");
      }
    },
  },
};
</script>
