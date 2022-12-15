<template>
  <div>
    <div class="main">
      <img
        alt="Vue logo"
        src="@/assets/logo.svg"
        class="m-a"
        width="125"
        height="125"
      />
    </div>
    <h1 class="text">Ready to get busy?</h1>
    <h3 class="text">Enter your name and let's get started.</h3>
    <input type="text" placeholder="name" />
    <RouterLink class="button text m-a glow-on-hover" to="/game">
      <div class="m-a">START</div>
    </RouterLink>
  </div>
</template>

<script lang="ts">
</script>

<style>
.main {
  display: flex;
  justify-content: space-between;
  margin-top: 160px;
}
.m-a {
  margin: auto;
}
.text {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-decoration: none;
  color: var(--color-text-contrast)
}
.button {
  display: flex;
  padding: 10px;
  margin-top: 16px;
}
.glow-on-hover {
  width: 120px;
  height: 50px;
  border: none;
  outline: none;
  color: #fff;
  background: #2596be;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}
</style>