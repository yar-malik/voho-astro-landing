// Ensure the script runs after the page has loaded
document.addEventListener('DOMContentLoaded', function() {
    // The apiKey and assistant variables are injected from the server-side script
    console.log('Client-side API Key:', apiKey, 'Assistant ID:', assistant);
  
    var vapiInstance = null;
  
    function initializeVapi() {
      if (window.vapiSDK) {
        // Initialize the Vapi SDK instance
        vapiInstance = window.vapiSDK.run({
          apiKey: apiKey,
          assistant: assistant,
          config: {}, // Optional configurations
        });
  
        console.log("Vapi instance initialized:", vapiInstance);
  
        // Add event listeners for Vapi events
        vapiInstance.on("call-start", () => {
          console.log("Call started");
        });
  
        vapiInstance.on("call-end", () => {
          console.log("Call ended");
        });
  
        // Toggle assistant based on its started state
        const vapiButton = document.getElementById("vapi-button");
        if (vapiButton) {
          vapiButton.addEventListener("click", () => {
            if (vapiInstance.started) {
              console.log("Ending call...");
              vapiInstance.stop();
            } else {
              console.log("Starting call...");
              vapiInstance.start();
            }
          });
        }
      } else {
        console.error("Vapi SDK did not load correctly.");
      }
    }
  
    // Ensure the SDK is loaded before initialization
    if (window.vapiSDK) {
      initializeVapi();
    } else {
      window.addEventListener('load', initializeVapi);
    }
  });
  