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
  } => {
    return {
      expired: false,
      roomName: null,
      playerName: null,
      playerList: [],
      hostName: null,
      sessionId: null,
      showValues: false,
    };
  },
  actions: {
    updateBoardState(
      playerList: { name: string; choice: string }[],
      showValues: boolean
    ) {
      console.log("updating playerlist to: ", playerList);
      this.playerList = playerList;
      this.showValues = showValues;
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
  },
});
