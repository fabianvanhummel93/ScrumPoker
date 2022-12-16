

<template>
  <div>
    <header class="header">
      <div class="text-header">SCRUM POKER</div>
      <ThemeSlider />
    </header>
    <RouterView class="app" />
  </div>
</template>

<script lang="ts">
import ThemeSlider from "./components/ThemeSlider.vue";
import SocketioService from './services/socketio.service.js';

export default {
  name: 'App',
  components: {ThemeSlider},
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  }
}
</script>

<style>
.app {
  text-align: center;
}
.header {
  transition: color 0.5s, background-color 0.5s;
  position: relative;
  z-index: 10;
  width: 100%;
  background-color: var(--color-background-mute);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 15px;
  color: var(--color-heading);
}
.text-header {
  text-align: center;
  font-size: xx-large;
}
</style>
