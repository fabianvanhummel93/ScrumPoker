import { defineStore } from "pinia";

export const useBoardState = defineStore("board", {
  state: (): {
    expired: boolean;
    roomName: string | null;
    playerName: string | null;
    playerList: { name: string; choice: string }[];
    hostName: string | null;
    sessionId: string | null;
    showValues: boolean;
    availableNumberSeries: any;
    chosenNumberSeries: any;
    selectedTheme: string;
    didVote: boolean;
  } => {
    return {
      expired: false,
      roomName: null,
      playerName: null,
      playerList: [],
      hostName: null,
      sessionId: null,
      showValues: false,
      availableNumberSeries: null,
      chosenNumberSeries: {
        name: "Fibonacci",
        values: ["0", "0.5", "1", "2", "3", "5", "8", "coffee", "?", "!"],
      },
      selectedTheme: "Numbers",
      didVote: false,
    };
  },
  actions: {
    updateBoardState(
      playerList: { name: string; choice: string }[],
      showValues: boolean,
      roomName?: string
    ) {
      this.playerList = playerList;
      this.showValues = showValues;
      if (roomName) {
        this.roomName = roomName;
      }
    },
    updateRoomName(roomName: string) {
      this.roomName = roomName;
    },
    updatePlayerName(playerName: string) {
      this.playerName = playerName;
    },
    updateHostName(hostName: string) {
      this.hostName = hostName;
    },
    updateSessionId(id: string) {
      this.sessionId = id;
    },
    updateNumberSeries(series: any) {
      this.availableNumberSeries = series;
    },
    chooseNumberSeries(name: string) {
      this.chosenNumberSeries = this.availableNumberSeries.find(
        (series: any) => series.name === name
      );
    },
    chooseTheme(theme: string) {
      this.selectedTheme = theme;
    },
    resetVoteStatus() {
      this.didVote = false;
    },
  },
});
