<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      Previous
    </button>
    <span v-for="page in visiblePages" :key="page">
      <button
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </span>
    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    visiblePages() {
      const maxPages = 10;
      const half = Math.floor(maxPages / 2);
      let start = Math.max(1, this.currentPage - half);
      let end = Math.min(this.totalPages, this.currentPage + half);

      // Adjust the range to always show 10 pages if possible
      if (end - start + 1 < maxPages) {
        if (start === 1) {
          end = Math.min(this.totalPages, start + maxPages - 1);
        } else if (end === this.totalPages) {
          start = Math.max(1, end - maxPages + 1);
        }
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('change-page', page);
      }
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
}
button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
}
button.active {
  background-color: #007bff;
  color: #fff;
}
button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
