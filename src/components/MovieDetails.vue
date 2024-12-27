<template>
  <div class="text-center">
    <img :src="movieUrl" :alt="movieDetails?.title">
    <h1>{{ movieDetails?.title.toUpperCase() }}</h1>

    <div>
      <span v-for="g in movieDetails?.genres" :key="g.id">
        <span class="font-bold border-rounded border b-solid mr-2 pr-1 pl-1"> {{g.name}} </span>

      </span>
    </div>
    <p><b>Release Date:</b> {{ movieDetails?.release_date }}</p>
    <p><b>Rating:</b> {{ movieDetails?.vote_average }}</p>
    <p><b>Overview:</b> {{ movieDetails?.overview }}</p>
  </div>
</template>

<script setup>
import { useMoviesStore } from '../stores/moviesStore';
import { computed, onBeforeMount} from 'vue'
import { storeToRefs } from 'pinia'

const moviesStore = useMoviesStore();
const { movieDetails } = storeToRefs(moviesStore)

const moviePoster = computed(() => movieDetails.value?.poster_path)

const movieUrl = computed(() => {
  return `https://image.tmdb.org/t/p/w400${moviePoster.value}`
})

onBeforeMount(() => {
  const movieId = window.location.pathname.split('/movie/')[1];
  moviesStore.loadMovieDetails(movieId);
  console.log('movieDetails', movieDetails.value)
});
</script>

<style>
/* Add styles as needed */
</style>
