import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse incoming form data
    const data = await request.json();
    const { phone, name, email, language } = data;

    // Validate required fields
    if (!phone || !name || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Define API endpoints for different languages
    const apiEndpoints = {
      german: 'https://vapi.ai?demo=true&shareKey=d164f8de-d636-448f-b060-714352684dc2&assistantId=e773639d-8651-4f6e-bf67-7e18dba65b21',
      english: 'https://vapi.ai?demo=true&shareKey=d164f8de-d636-448f-b060-714352684dc2&assistantId=32d49254-2074-4ee8-95f8-22fbfa41d5c4',
    };

    const selectedApiEndpoint = apiEndpoints[language.toLowerCase()];
    if (!selectedApiEndpoint) {
      return new Response(
        JSON.stringify({ error: 'Unsupported language' }),
        { status: 400 }
      );
    }

    // Prepare payload for the external API
    const payload = { phoneNumber: phone, name, email, language };

    // Make a request to the external API
    const externalResponse = await fetch(selectedApiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await externalResponse.json();

    if (!externalResponse.ok) {
      throw new Error(result.error || 'Failed to create call');
    }

    // Respond with success
    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
    });
  } catch (error: any) {
    console.error('Error in API handler:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500 }
    );
  }
};
