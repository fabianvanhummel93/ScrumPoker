<template>
  <div>
    <div v-if="board.expired">
      <h2>
        The session you tried to join has expired. Please host a new session or
        join an existing one.
      </h2>
    </div>
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
    <h3 class="text">Enter your name and a room name and let's get started.</h3>
    <input id="sessionname" type="text" placeholder="roomname" />
    <br />
    <input id="name" type="text" placeholder="name" />
    <div class="button text m-a glow-on-hover" @click="startSession()">
      <div class="m-a">START</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import socketioService from "@/services/socketio.service";
import { useBoardState } from "@/stores/Boardstate";
import { useRouter } from "vue-router";
const board = useBoardState();
const route = useRouter();

function startSession() {
  const enteredSessionName = (<HTMLInputElement>(
    document.getElementById("sessionname")
  )).value;
  const enteredName = (<HTMLInputElement>document.getElementById("name")).value;
  socketioService.startNewSession(enteredName, enteredSessionName, board);
  board.updatePlayerName(enteredName);
  setTimeout(function () {
    socketioService.getRoomHost(board.sessionId!, board, route);
    route.push({ path: `/game:sessionId=${board.sessionId}` });
  }, 500);
}
</script>

<style>
.main {
  display: flex;
  justify-content: space-between;
  margin-top: 120px;
}
.m-a {
  margin: auto;
}
.text {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-decoration: none;
  color: var(--color-text-contrast);
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
