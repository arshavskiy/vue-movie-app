import { defineStore } from 'pinia'
import { fetchPopularMovies, fetchMovieDetails, fetchRecentMovies } from '../api'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    popularMovies: [],
    movieDetails: null,
    filteredMovies: [],
    recentMovies: [],
    chartData: null,
    page: 1,
    hasMore: true,
    totalPages: 10,
  }),
  actions: {
    async loadPopularMovies(reset = false) {
      const response = await fetchPopularMovies(this.page)
      const newMovies = response.data.results.filter(
        (movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
      )

      if (reset) {
        this.popularMovies = newMovies
      } else {
        this.popularMovies.push(...newMovies)
      }

      if (this.totalPages === this.page){
        this.totalPages = this.totalPages + 10;
      }
      this.hasMore = newMovies.length > 0
    },
    searchMovies(query) {
      if (!query.trim()) {
        this.filteredMovies = []
        return
      }
      const lowerQuery = query.toLowerCase()
      this.filteredMovies = this.popularMovies.filter((movie) =>
        movie.title.toLowerCase().includes(lowerQuery),
      )
    },

    async loadMovieDetails(id) {
      const response = await fetchMovieDetails(id)
      this.movieDetails = response.data
    },
    async loadRecentMovies() {
      const response = await fetchRecentMovies()
      this.recentMovies = response.data.results

      const dates = this.recentMovies.map((movie) => movie.release_date).sort()
      const counts = dates.reduce((acc, date) => {
        acc[date] = (acc[date] || 0) + 1
        return acc
      }, {})
      this.chartData = {
        labels: Object.keys(counts),
        datasets: [
          {
            label: 'Movies Released',
            data: Object.values(counts),
            backgroundColor: '#007bff',
            borderColor: '#fff',
            borderWidth: 0,
          },
        ],
      }
    },
  },
})
