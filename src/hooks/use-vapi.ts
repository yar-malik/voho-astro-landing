import { useEffect, useRef, useState, useCallback } from "react";
import Vapi from "@vapi-ai/web";

const publicKey = import.meta.env.PUBLIC_VAPI_PUBLIC_KEY || "e5c00e52-3011-4a65-a46c-270c9d0fa091"; // Replace with your actual public key
// const assistantId = import.meta.env.PUBLIC_VAPI_ASSISTANT_ID || "00d6a328-d20a-4e35-bbff-819f8a515d70"; // Replace with your actual assistant ID
let assistantId ="1a2e2533-33f7-474f-8b97-4e89f11a7764"
// const chris = "1a2e2533-33f7-474f-8b97-4e89f11a7764"
// const jessica ="675f59f0-cce4-4c4b-8049-08f7da175458"
// console.log('publicKey',publicKey)
// console.log('assistantId',assistantId)
const useVapi = () => {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [conversation, setConversation] = useState<
    { role: string; text: string; timestamp: string; isFinal: boolean }[]
  >([]);
  const [statusText, setStatusText] = useState("Talk to AI Employee now!");
  const vapiRef = useRef<any>(null);
const Currentassistant = (voice) => {
  switch(voice){
    case "Chris":
      return assistantId = "1a2e2533-33f7-474f-8b97-4e89f11a7764"
    case "Jessica":
      return assistantId = "675f59f0-cce4-4c4b-8049-08f7da175458"
    case "Frida":
      return assistantId = "59dbd031-3998-4650-9192-8ed86706515f"
    case "Niander":
      return assistantId = "2bfddc0f-c16f-454d-b02f-11b1a218a58a"
    case "Maryam":
      return assistantId = "4cd96bfc-fdf3-4c3e-beba-ed7e94e4bc44"
    case "Ava":
      return assistantId = "580c6916-0bd7-4ee1-a3d1-2c725f98a393"
    case "Ben":
      return assistantId = "a0df527f-92cb-407d-ae5b-89f3f26b17c2"
    case "Lana":
      return assistantId = "d58c1700-f5b9-467d-b887-0b5b43de543b"
    case "Otto":
      return assistantId = "d3cab4db-e65e-4b6f-8b80-bdc8d3030038"
    case "Mila":
      return assistantId = "e5ee5a17-df7c-4f69-ae6c-272acfcb38b5"
  }
}
  const initializeVapi = useCallback(() => {
    // setStatusText("One sec...");
    if (!vapiRef.current) {
      const vapiInstance = new Vapi(publicKey);
      vapiRef.current = vapiInstance;
    
      vapiInstance.on("call-start", () => {
        setIsSessionActive(true);
        setStatusText("Just talk");
      });

      vapiInstance.on("call-end", () => {
        setIsSessionActive(false);
        setStatusText("Talk to AI Employee now!");
        setConversation([]); // Reset conversation on call end
      });

      vapiInstance.on("volume-level", (volume: number) => {
        setVolumeLevel(volume);
      });

      vapiInstance.on("message", (message: any) => {
        if (message.type === "transcript") {
          setConversation((prev) => {
            const timestamp = new Date().toLocaleTimeString();
            const updatedConversation = [...prev];
            if (message.transcriptType === "final") {
              // Find the partial message to replace it with the final one
              const partialIndex = updatedConversation.findIndex(
                (msg) => msg.role === message.role && !msg.isFinal,
              );
              if (partialIndex !== -1) {
                updatedConversation[partialIndex] = {
                  role: message.role,
                  text: message.transcript,
                  timestamp: updatedConversation[partialIndex].timestamp,
                  isFinal: true,
                };
              } else {
                updatedConversation.push({
                  role: message.role,
                  text: message.transcript,
                  timestamp,
                  isFinal: true,
                });
              }
            } else {
              // Add partial message or update the existing one
              const partialIndex = updatedConversation.findIndex(
                (msg) => msg.role === message.role && !msg.isFinal,
              );
              if (partialIndex !== -1) {
                updatedConversation[partialIndex] = {
                  ...updatedConversation[partialIndex],
                  text: message.transcript,
                };
              } else {
                updatedConversation.push({
                  role: message.role,
                  text: message.transcript,
                  timestamp,
                  isFinal: false,
                });
              }
            }
            return updatedConversation;
          });
        }

        if (
          message.type === "function-call" &&
          message.functionCall.name === "changeUrl"
        ) {
          const command = message.functionCall.parameters.url.toLowerCase();
          console.log(command);
          // const newUrl = routes[command];
          if (command) {
            window.location.href = command;
          } else {
            console.error("Unknown route:", command);
          }
        }
      });

      vapiInstance.on("error", (e: Error) => {
        console.error("Vapi error:", e);
      });
    }
  }, []);

  useEffect(() => {
    initializeVapi();

    // Cleanup function to end call and dispose Vapi instance
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }
    };
  }, [initializeVapi]);

  const toggleCall = async () => {
    try {
      setStatusText("One sec...");
      if (isSessionActive) {
        await vapiRef.current.stop();
      } else {
        await vapiRef.current.start(assistantId);
        setIsSessionActive(true)
      }
    } catch (err) {
      console.error("Error toggling Vapi session:", err);
    }
  };
  const endCall = async () => {
    try {
      if (isSessionActive && vapiRef.current) {
        await vapiRef.current.stop();
        setIsSessionActive(false);
        setStatusText("Call ended");
      }
    } catch (err) {
      console.error("Error ending call:", err);
    }
  };
  const sendMessage = (role: string, content: string) => {
    if (vapiRef.current) {
      vapiRef.current.send({
        type: "add-message",
        message: { role, content },
      });
    }
  };

  const say = (message: string, endCallAfterSpoken = false) => {
    if (vapiRef.current) {
      vapiRef.current.say(message, endCallAfterSpoken);
    }
  };

  const toggleMute = () => {
    if (vapiRef.current) {
      const newMuteState = !isMuted;
      vapiRef.current.setMuted(newMuteState);
      setIsMuted(newMuteState);
    }
  };

  return {
    volumeLevel,
    isSessionActive,
    conversation,
    toggleCall,
    sendMessage,
    say,
    toggleMute,
    statusText,
    isMuted,
    endCall,
    Currentassistant,
  };
};

export default useVapi;
