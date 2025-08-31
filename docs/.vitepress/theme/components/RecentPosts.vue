<template>
  <div class="recent-posts">
    <h2>Recent Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.url">
        <a :href="post.url">{{ post.title }}</a> - {{ post.description }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { data as posts } from '../data/posts.data.js'
</script>

<style scoped>
.recent-posts ul {
  list-style: none;
  padding: 0;
}

.recent-posts li {
  margin-bottom: 0.5rem;
}

.recent-posts a {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.recent-posts a:hover {
  text-decoration: underline;
}
</style>
