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

.glow-on-hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:active {
  color: #2596be;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #2596be;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>