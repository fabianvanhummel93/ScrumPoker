<script setup lang="ts">
import SocketioService from "@/services/socketio.service";
import { useRoute, useRouter } from "vue-router";
import { useBoardState } from "@/stores/Boardstate";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const boardState = useBoardState();
const routeParams: string = <string>route.params.sessionId;
const roomName = routeParams.split(":sessionId=")[1];
onBeforeMount(() => {
  SocketioService.getRoomHost(roomName, boardState, router);
});
const boardRefs = storeToRefs(boardState);
const hostName = boardRefs.hostName;

function joinSession() {
  const routeParams: string = <string>route.params.sessionId;
  const roomName = routeParams.split(":sessionId=")[1];
  // Get session ID from socket based on
  const enteredName = (<HTMLInputElement>document.getElementById("name")).value;
  boardState.updatePlayerName(enteredName);
  boardState.updateSessionId(roomName);
  SocketioService.joinRoom(roomName, enteredName, boardState);
  router.push({ path: `/game:sessionId=${roomName}` });
}
</script>

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
    <h1 class="text">
      You have been invited to a scrum poker session by {{ hostName }}
    </h1>
    <h3 class="text">Enter your name and let's get started.</h3>
    <input id="name" type="text" placeholder="name" />
    <div class="button text m-a glow-on-hover" @click="joinSession()">
      <div class="m-a">START</div>
    </div>
  </div>
</template>

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
