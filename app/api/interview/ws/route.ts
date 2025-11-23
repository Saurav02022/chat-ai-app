import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

// WebSocket endpoint for real-time interview assistance
export async function GET(request: NextRequest) {
  // Check if this is a WebSocket upgrade request
  const upgrade = request.headers.get('upgrade');

  if (upgrade !== 'websocket') {
    return new Response('Expected WebSocket', { status: 426 });
  }

  // Note: Next.js doesn't support WebSocket servers directly
  // We'll use this endpoint to establish connection info
  // The actual WebSocket server will run separately in Electron

  return new Response(
    JSON.stringify({
      message: 'WebSocket endpoint ready',
      endpoint: 'ws://localhost:3001',
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
