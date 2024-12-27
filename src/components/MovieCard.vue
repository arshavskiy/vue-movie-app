<template>
  <div class="movie-card" @click="handleClick">
    <div>
      <img :src="movieUrl" :alt="movie.title" />
    </div>
    <div class="flex flex-col ml-3 w-full relative">
      <h3 class="font-bold">{{ movie.title }}</h3>
      <div class="movie-card__date">{{ movie.release_date }}</div>
      <div class="movie-card__rating">
        {{ movie.vote_average.toFixed(1) }}
      </div>
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
.movie-card img{
  min-height: 330px;
  min-width: 220px;
}
.movie-card__rating {
  z-index: 2;
  position: absolute;
  top: -30px;
  font-size: 12px;
  font-weight: bold;
  background-color: black;
  border: 2px solid white;
  border-radius: 50%;
  padding: 5px;
  color: #f2f2f2;
}

.movie-card {
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.05);
}
</style>
