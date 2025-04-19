import { io } from "socket.io-client";

export const socket = io('https://devsync-server.vercel.app',{reconnectionAttempts:3})
