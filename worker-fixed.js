// Cloudflare Worker for notes sync - FIXED with KV persistence
// KV Namespace: Bind as "NOTES" in worker settings

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // GET - read notes from KV
    if (request.method === 'GET') {
      let notes = await env.NOTES.get('notes', { type: 'json' });
      if (!notes) {
        notes = { notes: [], lastUpdated: new Date().toISOString() };
      }
      return new Response(JSON.stringify(notes), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST - add new note
    if (request.method === 'POST') {
      const data = await request.json();
      let notes = await env.NOTES.get('notes', { type: 'json' }) || { notes: [] };
      
      // Add new note with timestamp
      const newNote = {
        id: Date.now(),
        content: data.content || data.note,
        timestamp: new Date().toISOString()
      };
      notes.notes.push(newNote);
      notes.lastUpdated = new Date().toISOString();
      
      await env.NOTES.put('notes', JSON.stringify(notes));
      
      return new Response(JSON.stringify({ success: true, note: newNote }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // PUT - replace all notes
    if (request.method === 'PUT') {
      const data = await request.json();
      data.lastUpdated = new Date().toISOString();
      await env.NOTES.put('notes', JSON.stringify(data));
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // DELETE - clear notes
    if (request.method === 'DELETE') {
      await env.NOTES.put('notes', JSON.stringify({ notes: [], lastUpdated: new Date().toISOString() }));
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
};
