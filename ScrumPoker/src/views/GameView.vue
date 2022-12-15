<script setup lang="ts">
  import { ref } from 'vue';
  const users = [{name: "Fabian", choice: 3}, {name: "Sander", choice: 5},
                  {name: "René", choice: 2}, {name: "Chris", choice: 5},
                  {name: "Lloyd", choice: 2}, {name: "Jaap", choice: 3},
                  {name: "Robin", choice: 8}, {name: "Joep", choice: "?"}]
  const pokerSeries: string[] = ["0", "1", "2", "3", "5", "8", "?", "!"]
  function cardSelected(item: string) {
    // Emit value or something?
    console.log('Emitted story point value: ', item)
    didVote.value = !didVote.value
    console.log('changed didVote to: ', didVote)
  }

  function cardUnselected() {
    // Emit value or something?
    console.log('Emitted empty story point value')
    didVote.value = false;
    console.log('changed didVote to: ', didVote)
  }
  var didVote = ref<boolean>(false);
</script>


<template>
  <div class="game">
    <h1 class="text">Hello {{users[0].name}}</h1>
      <div class="table-left"></div>
      <div class="table-right"></div>
      <div class="table-center">
        <div class="player-board" :class="{ 'player-board-small': users.length <= 12, 'player-board-large': users.length > 12  }">          
          <div v-for="user in users">
            <div v-if="users.length > 12">
              <div class="player-name-small">{{user.name}}</div>
              <div class="pokercard-small m-a">{{user.choice}}</div>
            </div>
            <div v-if="users.length <= 12">
              <div class="player-name">{{user.name}}</div>
              <div class="pokercard m-a">{{user.choice}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div class="poker">
    <div v-for="item in pokerSeries">
      <div class="pokercard pointer" @click="didVote? null : cardSelected(item)">
        <div v-if="didVote">{{null}}</div>
        <div v-if="!didVote">{{item}}</div>
      </div>
    </div>
  </div>
  <div class="cancel">
    <button class="button" @click="cardUnselected()">
      <p class="m-a">CANCEL VOTE</p>
    </button>
  </div>
</template>

<style>
.game {
  min-height: 85vh;
  position: relative;
  align-items: center;
}
.table-center{
  background-color: var(--color-background-mute);
  position: absolute;
  height: 50%;
  width: 40%;
  left: 30%;
  top: 10%;
}
.table-left{
  background-color: var(--color-background-mute);
  position: absolute;
  height: 50%;
  width: 25%;
  left: 17.5%;
  top: 10%;
  border-radius: 50%;
}
.table-right{
  background-color: var(--color-background-mute);
  position: absolute;
  height: 50%;
  width: 25%;
  left: 57.5%;
  top: 10%;
  border-radius: 50%;
}
.text {
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
</style>
