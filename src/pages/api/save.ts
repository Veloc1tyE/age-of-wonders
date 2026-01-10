import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Only allow in development
  if (import.meta.env.PROD) {
    return new Response('Not allowed in production', { status: 403 });
  }

  try {
    const { filepath, content } = await request.json();
    
    // Validate filepath to prevent directory traversal
    if (filepath.includes('..') || !filepath.startsWith('src/')) {
      return new Response(JSON.stringify({ error: 'Invalid filepath' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const fullPath = path.join(process.cwd(), filepath);
    await fs.writeFile(fullPath, content, 'utf-8');
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
