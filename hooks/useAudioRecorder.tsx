import { useCallback, useRef, useState } from "react";

export const useAudioRecorder = (onChunk?: (chunk: ArrayBuffer) => void) => {
  const [recording, setRecording] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext({ sampleRate: 16000 }); // 16kHz mono PCM
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      let silenceCounter = 0;
      const SILENCE_THRESHOLD = 0.01; // adjust this value to control sensitivity
      const SILENCE_DURATION = 10; // number of silent frames to skip sending

      processor.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        const pcmData = new Int16Array(inputData.length);
        let isSpeaking = false;

        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          if (Math.abs(s) > SILENCE_THRESHOLD) {
            isSpeaking = true;
          }
          pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }

        if (isSpeaking) {
          silenceCounter = 0;
          onChunk?.(pcmData.buffer);
        } else {
          silenceCounter++;
          if (silenceCounter < SILENCE_DURATION) {
            onChunk?.(pcmData.buffer); // optional: send a few silent chunks
          }
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      sourceRef.current = source;
      processorRef.current = processor;
      setRecording(true);
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Could not access the microphone. Please allow mic permissions.");
    }
  }, [onChunk]);

  const stopRecording = useCallback(() => {
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioContextRef.current?.close();
    setRecording(false);
  }, []);

  return {
    recording,
    startRecording,
    stopRecording,
  };
};
