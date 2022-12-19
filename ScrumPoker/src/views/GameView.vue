<script setup lang="ts">
import { useBoardState } from "@/stores/Boardstate";
import { storeToRefs } from "pinia";
import { ref, onBeforeUnmount, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import SocketioService from "../services/socketio.service.js";
const router = useRouter();
const route = useRoute();

const board = useBoardState();

const boardRefs = storeToRefs(board);
const users = boardRefs.playerList;
var didVote = boardRefs.didVote;
const scoresShown = boardRefs.showValues;

var linkCopied = ref(false);

const pokerSeries: any = boardRefs.chosenNumberSeries;
const numberSeries: any = boardRefs.availableNumberSeries;
const themes: string[] = ["Numbers", "Cookies"];
const selectedTheme = boardRefs.selectedTheme;

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
}
function writeToClipboard(sessionId: string) {
  var copyText = "http://localhost:5173/join:sessionId=" + sessionId;

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText);
  linkCopied.value = !linkCopied.value;

  setTimeout(function () {
    linkCopied.value = !linkCopied.value;
  }, 3000);
}
function selectTheme(theme: string) {
  board.chooseTheme(theme);
}
function selectNumberSeries(name: string) {
  SocketioService.setNumberSeries(board.sessionId!, name);
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
      <div
        v-if="board.hostName === board.playerName"
        class="button invite-button"
        @click="writeToClipboard(board.sessionId!)"
      >
        <p class="m-a">SHARE LINK</p>
      </div>
      <Transition>
        <p class="copy-message" v-if="linkCopied">Copied to clipboard!</p>
      </Transition>
      <div
        v-if="board.hostName === board.playerName && !scoresShown"
        class="button show-button"
        @click="showVotes(board.sessionId!)"
      >
        <p class="m-a">SHOW VOTES</p>
      </div>
      <div
        v-if="board.hostName === board.playerName && scoresShown"
        class="button show-button"
        @click="resetVoting(board.sessionId!)"
      >
        <p class="m-a">RESET VOTE</p>
      </div>
      <h1 class="text-game">Hello {{ board.playerName }}</h1>
      <h2 class="subtext-game">
        Currently planning in room: {{ board.roomName }}
      </h2>
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
              <div
                :class="{
                  'pokercard-small': selectedTheme === 'Numbers',
                  cookie: selectedTheme === 'Cookies',
                }"
                class="poker-text-small m-a"
              >
                <div v-if="scoresShown">
                  <img
                    v-if="user.choice === 'coffee'"
                    src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
                    height="50"
                    width="50"
                    style="margin-top: 16px"
                  />
                  {{ user.choice === "coffee" ? null : user.choice }}
                </div>
                <div v-if="!scoresShown && user.choice">
                  <img
                    src="https://www.freeiconspng.com/uploads/check-mark-ok-png-10.png"
                    height="50"
                    width="50"
                    style="margin-top: 16px"
                  />
                </div>
              </div>
            </div>
            <div v-if="users.length <= 12">
              <div class="player-name">{{ user.name }}</div>
              <div
                :class="{
                  pokercard: selectedTheme === 'Numbers',
                  cookie: selectedTheme === 'Cookies',
                }"
                class="poker-text m-a"
              >
                <div v-if="scoresShown">
                  <img
                    v-if="user.choice === 'coffee'"
                    src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
                    height="70"
                    width="70"
                    style="margin-top: 16px"
                  />
                  {{ user.choice === "coffee" ? null : user.choice }}
                </div>
                <div v-if="!scoresShown && user.choice">
                  <img
                    src="https://www.freeiconspng.com/uploads/check-mark-ok-png-10.png"
                    height="70"
                    width="70"
                    style="margin-top: 16px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="poker">
      <div v-for="item in pokerSeries.values">
        <div
          class="pokercard poker-text pointer"
          @click="didVote ? null : cardSelected(item)"
        >
          <div v-if="didVote">{{ null }}</div>
          <div v-if="!didVote">
            <img
              v-if="item === 'coffee'"
              src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
              height="60"
              width="60"
              style="margin-top: 16px"
            />
            {{ item === "coffee" ? null : item }}
          </div>
        </div>
      </div>
    </div>
    <div class="cancel">
      <button
        class="button"
        @click="!scoresShown ? (didVote ? cardUnselected() : null) : null"
      >
        <p class="m-a">CANCEL VOTE</p>
      </button>
    </div>
    <div class="dropdown themes">
      <span class="button-text">THEMES</span>
      <div class="dropdown-content" v-for="theme in themes">
        <p @click="selectTheme(theme)">{{ theme }}</p>
      </div>
    </div>
    <div v-if="board.hostName === board.playerName" class="dropdown series">
      <span class="button-text">NUMBERSERIES</span>
      <div class="dropdown-content" v-for="series in numberSeries">
        <p @click="selectNumberSeries(series.name)">{{ series.name }}</p>
      </div>
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
  top: 15%;
}
.table-left {
  background-color: var(--color-background-mute);
  position: absolute;
  height: 50%;
  width: 25%;
  left: 17.5%;
  top: 15%;
  border-radius: 50%;
}
.table-right {
  background-color: var(--color-background-mute);
  position: absolute;
  height: 50%;
  width: 25%;
  left: 57.5%;
  top: 15%;
  border-radius: 50%;
}
.text-game {
  color: var(--color-text-contrast);
  text-align: center;
  font-size: xxx-large;
}
.subtext-game {
  color: var(--color-text-contrast);
  text-align: center;
  font-size: x-large;
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
  text-align: center;
}
.pokercard-small {
  height: 50px;
  width: 40px;
  background-color: var(--color-background-soft);
  color: var(--color-text-contrast);
  text-align: center;
}
.poker-text {
  line-height: 100px;
  font-size: xx-large;
}
.poker-text-small {
  line-height: 50px;
  font-size: x-large;
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
  line-height: 2;
}
.show-button {
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 1;
}
.invite-button {
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 1;
}
.copy-message {
  position: absolute;
  left: 8px;
  top: 64px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-decoration: none;
  font-size: large;
  color: var(--color-text-contrast);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.dropdown {
  display: inline-block;
  width: 160px;
  height: 32px;
  background: #2596be;
  cursor: pointer;
  z-index: 0;
  border-radius: 4px;
  position: absolute;
}
.series {
  right: 64px;
  bottom: 64px;
}
.themes {
  right: 256px;
  bottom: 64px;
}
.dropdown-content {
  display: none;
  position: relative;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.button-text {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-decoration: none;
  font-size: large;
  color: #fff;
}
.cookie {
  width: 120px; /*width of your image*/
  height: 120px; /*height of your image*/
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/e/e5/Crystal_Project_cookie.png");
  background-size: 120px;
}
</style>
