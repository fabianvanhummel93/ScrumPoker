<script setup lang="ts">
  const items = [{name: "Fabianski", number: null}, {name: "Sander", number: null}]
  const pokerSeries: string[] = ["0", "1", "2", "3", "5", "8", "?", "!"]
  function cardSelected(item: string) {
    // Emit value or something?
    console.log('Emitted story point value: ', item)
    didVote = !didVote
    console.log('changed didVote to: ', didVote)
  }
  var didVote: boolean = false;
</script>


<template>
  <div class="game">
    <h1 class="text">Hallo {{items[0].name}}</h1>
      <div class="table-left"></div>
      <div class="table-center"></div>
      <div class="table-right"></div>
  </div>
  <div class="poker">
    <div v-for="item in pokerSeries">
      <div class="pokercard" @click="didVote? null : cardSelected(item)">
        <div v-if="didVote">{{null}}</div>
        <div v-if="!didVote">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<style>
.game {
  min-height: 90vh;
  position: relative;
  align-items: center;
}
.table-center{
  background-color: var(--color-background-soft);
  position: absolute;
  height: 50%;
  width: 20%;
  left: 40%;
  top: 10%;
}
.table-left{
  background-color: var(--color-background-soft);
  position: absolute;
  height: 50%;
  width: 40%;
  left: 20%;
  top: 10%;
  border-radius: 50%;
}
.table-right{
  background-color: var(--color-background-soft);
  position: absolute;
  height: 50%;
  width: 40%;
  left: 40%;
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
  cursor: pointer;
}
</style>
