<template>
  <div class="movie-card flex flex-row" @click="handleClick">
    <div>
      <img :src="movieUrl" :alt="movie.title" />
    </div>
    <div class="flex flex-col justify-center ml-3 items-center w-full">
      <h2 class="pb-2">{{ movie.title.toUpperCase() }}</h2>
      <p>Release Date: {{ movie.release_date }}</p>
      <p>Rating: {{ movie.vote_average }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  movie: Object,
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.movie.id)
}

const movieUrl = computed(() => {
  return `https://image.tmdb.org/t/p/w200${props.movie.poster_path}`
})
</script>

<style>
.movie-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.05);
}
</style>
