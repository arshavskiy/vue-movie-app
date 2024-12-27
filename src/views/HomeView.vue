<template>
  <div>
    <h1 class="text-center mb-4">Popular Movies</h1>
    <div class="search-container mb-4">
      <n-input
        v-model:value="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search movies..."
        loading
      />
    </div>
    <div>
      <div class="movies">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
          @click="viewMovieDetails(movie.id)"
        />
      </div>
      <Pagination
        :current-page="moviesStore.page"
        :total-pages="moviesStore.totalPages"
        @change-page="handlePageChange"
      />
    </div>
    <LineChart v-if="moviesStore.chartData" :chart-data="moviesStore.chartData" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMoviesStore } from '../stores/moviesStore'
import { debounce } from 'lodash'
import Pagination from '../components/Pagination.vue'
import MovieCard from '../components/MovieCard.vue'
import LineChart from '../components/LineChart.vue'

import { NInput } from 'naive-ui'

const moviesStore = useMoviesStore()
moviesStore.loadPopularMovies()
moviesStore.loadRecentMovies()

const searchQuery = ref('')
const debouncedSearch = debounce(() => {
  moviesStore.searchMovies(searchQuery.value)
}, 300)

const filteredMovies = computed(() => {
  if (searchQuery.value.trim() === '') {
    return moviesStore.popularMovies
  }
  return moviesStore.filteredMovies
})

const handleSearch = () => {
  debouncedSearch()
}

const handlePageChange = (page) => {
  moviesStore.page = page
  moviesStore.loadPopularMovies(true)
}

const viewMovieDetails = (id) => {
  window.location.href = `/movie/${id}`
}
</script>
