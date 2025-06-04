"use client";
import { useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useChatSocket = (
  onGptReply: (msg: string) => void,
  onTranscription?: (text: string) => void,
  onGptAudio?: (base64Audio: string) => void
) => {
  const socketRef = useRef<Socket | null>(null);

  const initSocket = () => {
    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL);
    socketRef.current = socket;

    socket.on("connect", () => {});

    socket.on("gpt_reply", (msg) => {
      onGptReply(msg);
    });

    if (onTranscription) {
      socket.on("transcription", onTranscription);
    }

    if (onGptAudio) {
      socket.on("gpt_audio", (msg) => {
        onGptAudio(msg);
      });
    }

    socket.on("disconnect", () => {
      console.log("🔌 Disconnected from server");
      socketRef.current = null;
    });
  };
  return {
    sendUserMessage: (msg: string) =>
      socketRef.current?.emit("user_message", msg),
    startTranscription: () => {
      if (!socketRef.current) {
        initSocket();
        setTimeout(() => {
          socketRef.current?.emit("start_transcription");
        }, 400); // Adjust delay if needed
      } else {
        socketRef.current.emit("start_transcription");
      }
    },
    // startTranscription: () => socketRef.current?.emit("start_transcription"),
    sendAudioChunk: (chunk: ArrayBuffer) =>
      socketRef.current?.emit("audio_chunk", chunk),
    stopTranscription: () => {
      socketRef.current?.emit("stop_transcription");
    },
    startSession: (data: any) => socketRef.current?.emit("start_session", data),
  };
};
