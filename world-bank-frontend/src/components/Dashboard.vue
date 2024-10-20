<template>
  <div
    class="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 p-16"
  >
    <div
      class="w-full max-w-7xl bg-white rounded-lg shadow-md p-8 border border-gray-200"
    >
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-semibold text-gray-800">Dashboard</h1>
        <button
          @click="logout"
          class="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <div class="relative">
        <canvas
          id="myChart"
          class="p-4 border border-gray-300 rounded-lg shadow-sm"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "Dashboard",
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      myChart: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `https://api.worldbank.org/pip/v1/pip?country=PER`
        );

        const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
          console.error("No se encontraron datos o el formato es incorrecto.");
          return;
        }

        const years = data.map((item) => item.reporting_year);
        const povertyRates = data.map((item) => item.headcount);

        this.chartData = {
          labels: years,
          datasets: [
            {
              label: "Tasa de Pobreza",
              data: povertyRates,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        };

        this.renderChart();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    renderChart() {
      const ctx = document.getElementById("myChart").getContext("2d");

      if (this.myChart) {
        this.myChart.destroy();
      }

      this.myChart = new Chart(ctx, {
        type: "line",
        data: this.chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Tasa de Pobreza",
              },
            },
            x: {
              title: {
                display: true,
                text: "Año",
              },
            },
          },
        },
      });
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
