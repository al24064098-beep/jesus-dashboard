// Cloudflare Worker for notes sync
// Deploy at: https://workers.cloudflare.com

let notes = { notes: [], lastUpdated: null };

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // GET - read notes
    if (request.method === 'GET') {
      return new Response(JSON.stringify(notes), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST/PUT - save notes
    if (request.method === 'POST' || request.method === 'PUT') {
      const data = await request.json();
      notes = data;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
};
