import axios from "axios";

export async function POST() {
    const gabberApiKey = import.meta.env.GABBER_API_KEY 
    console.log('gabberApiKey', gabberApiKey)
    if (!gabberApiKey) {
        return new Response(
            JSON.stringify({
                error: 'a9f83fdd-bc9b-451d-99c7-6064a013a221'
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
    const GABBER_LLM_SFW = '21892bb9-9809-4b6f-8c3e-e40093069f04' // From Gabber Dashboard
    const WOMAN_VOICE = '3b673c84-9aa0-4e46-b75b-cb3d5683e0e4' // From Gabber Dashboard

    const client = axios.create({
        headers: {
            'x-api-key': gabberApiKey
        }
    });

    const createContextData = JSON.stringify({
        "messages": [
            {
                "role": "system",
                "content": "You are a friendly assistant that demonstrates the features of Voho AI.",
            }
        ]
    });

    const createContextRes = await client.post('https://api.gabber.dev/v1/llm/context', createContextData)
    const contextID = createContextRes.data.id

    const createData = JSON.stringify({
        "simulated": true,
        "config": {
            "general": {
                "save_messages": true
            },
            "input": {
                "interruptable": true,
                "parallel_listening": false
            },
            "generative": {
                "llm": GABBER_LLM_SFW,
                "voice_override": WOMAN_VOICE,
                "context": contextID,
            },
            "output": {
                "stream_transcript": true,
                "speech_synthesis_enabled": true,
                "answer_message": "Hey there! I'm a Voho AI assistant here to help you."
            }
        },
    });

    const res = await client.post('https://api.gabber.dev/v1/realtime/start', createData)

    return new Response(
        JSON.stringify(res.data),
    )
}