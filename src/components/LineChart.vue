<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'

import { Bar } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
)

defineProps({
  chartData: Object,
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Movies Released in the Last 90 Days',
    },
  },
}

// const chartData = {
//   labels: [ 'January', 'February', 'March' ],
//   datasets: [ { data: [40, 20, 12] } ]
// }
</script>

<style>
/* Add styles as needed */
</style>
