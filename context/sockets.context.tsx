import io, { Socket } from "socket.io-client";
import { useEffect, useState, useContext, createContext } from "react";
import { SOCKET_URL } from "../config/default";
import * as EVENTS from "../config/socketEvents";

interface Context {
  socket: Socket;
  setRole: Function;
  role?: string;
  setSongTitle: Function;
  title?: string;
  clientID?: string;
}

// @ts-ignore
const socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"],
});

const SocketContext = createContext<Context>({
  socket,
  setRole: () => false,
  setSongTitle: () => false,
});

function SocketProvider(props: any) {
  const [clientID, setClientID] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");

  useEffect(() => {
    socket.emit(EVENTS.CLIENT_EVENTS.INITIALIZATION)
  }, [])

  useEffect(() => {
    console.log("Role:", role)
  }, [role])

  socket.on(EVENTS.SERVER_EVENTS.COMPLETE_INITALIZATION, (userID) => {
    setClientID(userID);
    socket.emit(EVENTS.CLIENT_EVENTS.INITIALIZATION_COMPLETE, clientID);
  })

  return (
    <SocketContext.Provider value={{ socket, setRole, role, setSongTitle, clientID }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
export default SocketProvider;
