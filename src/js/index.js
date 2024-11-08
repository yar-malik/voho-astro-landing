import Vapi from "@vapi-ai/web";

const VAPI_API_KEY = import.meta.env.PUBLIC_VAPI_API_KEY;
const VAPI_ASSISTANT_ID = import.meta.env.PUBLIC_VAPI_ASSISTANT_ID;

const statusDisplay = document.getElementById("status");
const speakerDisplay = document.getElementById("speaker");
const volumeDisplay = document.getElementById("volume");
const vapiTyping = document.getElementById("vapiTyping");
const vapiStatusMessage = document.getElementById("vapiStatusMessage");
const chatWindow = document.getElementById("chat");
const callWithVapi = document.getElementById("callWithVapi");

const vapi = new Vapi(VAPI_API_KEY);

let connected = false;
let assistantIsSpeaking = false;
let volumeLevel = 0;

vapi.on("call-start", () => {
  connected = true;
  updateUI();
});

vapi.on("call-end", () => {
  connected = false;
  updateUI();
  callWithVapi.style.boxShadow = `0 0 0px 0px rgba(58,25,250,0.7)`;
});

vapi.on("speech-start", () => {
  assistantIsSpeaking = true;
  updateUI();
});

vapi.on("speech-end", () => {
  assistantIsSpeaking = false;
  updateUI();
});

vapi.on("message", (message) => {
  if (message.type === "function-call" && message.functionCall) {
    if (message.functionCall.name === "ChangeColor") {
      callWithVapi.style.backgroundColor = message.functionCall.parameters.ColorCode;
    } else if (message.functionCall.name === "WriteText") {
      vapiTyping.textContent = message.functionCall.parameters.Text;
    }
  } else if (message.type === "conversation-update") {
    updateChat(message);
  }
});

vapi.on("volume-level", (level) => {
  volumeLevel = level;
  const spread = volumeLevel * 30;
  volumeDisplay.textContent = `Volume: ${volumeLevel.toFixed(3)}`;
  callWithVapi.style.boxShadow = `0 0 ${spread}px ${spread / 2}px rgba(58,25,250,0.7)`;
});

vapi.on("error", (error) => {
  connected = false;
  vapiStatusMessage.textContent = error.error?.message || "An error occurred.";
  updateUI();
});

callWithVapi.addEventListener("click", () => {
  if (connected) {
    vapi.stop();
    callWithVapi.style.backgroundColor = "#858585";
  } else {
    vapi.start({ assistantId: VAPI_ASSISTANT_ID });
    callWithVapi.style.backgroundColor = "#007aff";
  }
});

function updateChat(conversationUpdate) {
  chatWindow.innerHTML = "";
  conversationUpdate.conversation.forEach((msg) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${msg.role}`;
    messageDiv.textContent = msg.content || "Processing...";
    chatWindow.appendChild(messageDiv);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateUI() {
  statusDisplay.textContent = `Status: ${connected ? "Connected" : "Disconnected"}`;
  speakerDisplay.textContent = `Speaker: ${assistantIsSpeaking ? "Assistant" : "User"}`;
}
