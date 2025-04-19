import { io } from "socket.io-client";

export const socket = io('https://devsync-server-production.up.railway.app/',{reconnectionAttempts:3})
