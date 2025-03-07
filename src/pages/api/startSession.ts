import axios from "axios";

export async function POST() {
  const gabberApiKey = import.meta.env.GABBER_API_KEY;
  console.log('gabberApiKey', gabberApiKey);

  if (!gabberApiKey) {
    return new Response(
      JSON.stringify({ error: 'API key missing' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const GABBER_LLM_SFW = '21892bb9-9809-4b6f-8c3e-e40093069f04'; // From Gabber Dashboard
  const WOMAN_VOICE = '3b673c84-9aa0-4e46-b75b-cb3d5683e0e4'; // From Gabber Dashboard

  const client = axios.create({
    headers: {
      'x-api-key': gabberApiKey,
      'Content-Type': 'application/json'
    }
  });

  try {
    // Create context
    const createContextData = {
      messages: [
        {
          role: "system",
          content: "You are a friendly assistant that demonstrates the features of Voho AI."
        }
      ]
    };

    const createContextRes = await client.post(
      'https://api.gabber.dev/v1/llm/context',
      createContextData
    );

    // Check that the response is JSON
    if (!createContextRes.headers['content-type']?.includes('application/json')) {
      throw new Error(`Expected JSON for context but received: ${createContextRes.data}`);
    }

    const contextID = createContextRes.data.id;

    // Prepare realtime session payload
    const createData = {
      simulated: true,
      config: {
        general: { save_messages: true },
        input: { interruptable: true, parallel_listening: false },
        generative: {
          llm: GABBER_LLM_SFW,
          voice_override: WOMAN_VOICE,
          context: contextID
        },
        output: {
          stream_transcript: true,
          speech_synthesis_enabled: true,
          answer_message: "Hey there! I'm a Voho AI assistant here to help you."
        }
      }
    };

    const realtimeRes = await client.post(
      'https://api.gabber.dev/v1/realtime/start',
      createData
    );

    // Check that the realtime session response is JSON
    if (!realtimeRes.headers['content-type']?.includes('application/json')) {
      throw new Error(`Expected JSON for realtime start but received: ${realtimeRes.data}`);
    }

    return new Response(
      JSON.stringify(realtimeRes.data),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
