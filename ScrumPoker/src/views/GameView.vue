<script setup lang="ts">
import { useBoardState } from "@/stores/Boardstate";
import { storeToRefs } from "pinia";
import { ref, onBeforeUnmount, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import SocketioService from "../services/socketio.service.js";
const router = useRouter();
const route = useRoute();

var didVote = ref<boolean>(false);
const board = useBoardState();

const boardRefs = storeToRefs(board);
const users = boardRefs.playerList;

const scoresShown = boardRefs.showValues;

const pokerSeries: string[] = ["0", "1", "2", "3", "5", "8", "?", "!"];
function cardSelected(item: string) {
  didVote.value = !didVote.value;
  SocketioService.sendPokerValue("player-pokervalue", {
    name: board.playerName!,
    choice: item,
    sessionId: board.sessionId!,
  });
}
function cardUnselected() {
  didVote.value = false;
  SocketioService.sendPokerValue("player-pokervalue", {
    name: board.playerName!,
    choice: null,
    sessionId: board.sessionId!,
  });
}
function showVotes(sessionId: string) {
  SocketioService.showVotes(sessionId);
}
function resetVoting(sessionId: string) {
  SocketioService.resetVoting(sessionId);
  didVote = ref(false);
}
onBeforeUnmount(() => {
  SocketioService.disconnect();
});
onBeforeMount(() => {
  if (!board.playerName) {
    const routeParams: string = <string>route.params.sessionId;
    const roomName = routeParams.split(":sessionId=")[1];
    router.push({ path: `/join:sessionId=${roomName}` });
  }
});
</script>

<template>
  <div>
    <div class="game">
      <button
        v-if="board.hostName === board.playerName && !scoresShown"
        class="show-button"
        @click="showVotes(board.sessionId!)"
      >
        SHOW VOTES
      </button>
      <button
        v-if="board.hostName === board.playerName && scoresShown"
        class="show-button"
        @click="resetVoting(board.sessionId!)"
      >
        RESET VOTE
      </button>
      <h1 class="text-game">Hello {{ board.playerName }}</h1>
      <div class="table-left"></div>
      <div class="table-right"></div>
      <div class="table-center">
        <div
          class="player-board"
          v-if="users"
          :class="{
            'player-board-small': users.length <= 12,
            'player-board-large': users.length > 12,
          }"
        >
          <div v-for="user in users">
            <div v-if="users.length > 12">
              <div class="player-name-small">{{ user.name }}</div>
              <div class="pokercard-small m-a">
                <div v-if="scoresShown">{{ user.choice }}</div>
              </div>
            </div>
            <div v-if="users.length <= 12">
              <div class="player-name">{{ user.name }}</div>
              <div class="pokercard m-a">
                <div v-if="scoresShown">{{ user.choice }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="poker">
      <div v-for="item in pokerSeries">
        <div
          class="pokercard pointer"
          @click="didVote ? null : cardSelected(item)"
        >
          <div v-if="didVote">{{ null }}</div>
          <div v-if="!didVote">{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="cancel">
      <button class="button" @click="!scoresShown ? cardUnselected() : null">
        <p class="m-a">CANCEL VOTE</p>
      </button>
    </div>
  </div>
</template>

<style>
.game {
  min-height: 85vh;
  position: relative;
  align-items: center;
}
.table-center {
  background-color: var(--color-background-mute);
  position: absolute;
  height: 50%;
  width: 40%;
  left: 30%;
  top: 10%;
}
.table-left {
  background-color: var(--color-background-mute);
  position: absolute;
  height: 50%;
  width: 25%;
  left: 17.5%;
  top: 10%;
  border-radius: 50%;
}
.table-right {
  background-color: var(--color-background-mute);
  position: absolute;
  height: 50%;
  width: 25%;
  left: 57.5%;
  top: 10%;
  border-radius: 50%;
}
.text-game {
  color: var(--color-text-contrast);
  text-align: center;
  font-size: xxx-large;
}
.poker {
  position: absolute;
  bottom: 128px;
  display: flex;
  width: 80%;
  left: 10%;
  margin: auto;
  justify-content: space-between;
}
.pokercard {
  height: 100px;
  width: 80px;
  background-color: var(--color-background-soft);
  color: var(--color-text-contrast);
  line-height: 100px;
  font-size: xxx-large;
  text-align: center;
}
.pokercard-small {
  height: 50px;
  width: 40px;
  background-color: var(--color-background-soft);
  color: var(--color-text-contrast);
  line-height: 50px;
  font-size: x-large;
  text-align: center;
}
.pointer {
  cursor: pointer;
}
.player-board {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  height: 100%;
}
.player-board-small {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.player-board-large {
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
.player-name {
  text-align: center;
  color: var(--color-text-contrast);
  text-align: center;
  font-size: x-large;
}
.player-name-small {
  text-align: center;
  color: var(--color-text-contrast);
  text-align: center;
  font-size: medium;
}
.cancel {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.button {
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
  margin: auto;
  align-items: center;
}
.show-button {
  width: 120px;
  height: 50px;
  border: none;
  outline: none;
  color: #fff;
  background: #2596be;
  border-radius: 10px;
  margin: auto;
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
  z-index: 1;
}
</style>
