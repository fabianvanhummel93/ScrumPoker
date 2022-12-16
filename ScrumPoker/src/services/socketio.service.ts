import { io, Socket } from "socket.io-client";
import { environment } from "../environment";
class SocketioService {
  socket: Socket | undefined;

  constructor() {}

  setupSocketConnection() {
    this.socket = io(environment.VUE_APP_SOCKET_ENDPOINT);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  startNewSession(name: string, sessionname: string, store: any) {
    store.updateRoomName(sessionname);
    this.socket?.emit("start-new-session", {
      roomName: sessionname,
      name: name,
    });
    this.socket?.on("room-id", (id) => {
      store.updateSessionId(id);
    });
    this.socket?.on("player-entered-value", (args) => {
      store.updateBoardState(args.users, args.showValues);
    });
  }

  joinRoom(sessionId: string, name: string, store: any) {
    this.socket?.emit("player-joined-room", {
      sessionId: sessionId,
      name: name,
    });
    this.socket?.on("player-entered-value", (args) => {
      store.updateBoardState(args.users, args.showValues);
    });
  }

  getRoomHost(roomName: string, store: any, router: any) {
    console.log(roomName);
    this.socket?.emit("get-host", roomName);
    this.socket?.on("send-host", (hostName) => {
      if (hostName) {
        store.updateHostName(hostName);
      } else {
        store.expired = true;
        router.push("/");
      }
    });
  }

  sendPokerValue(
    category: string,
    params: { name: string; choice: string | null; sessionId: string }
  ) {
    if (this.socket) {
      this.socket.emit(category, params);
    }
  }

  showVotes(sessionId: string) {
    this.socket?.emit("show-votes", sessionId);
  }

  resetVoting(sessionId: string) {
    this.socket?.emit("reset-votes", sessionId);
  }
}

export default new SocketioService();
