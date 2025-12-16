// app/api/shorts/[code]/route.js

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(request, { params }) {
  // ← THIS LINE FIXES EVERYTHING
  const { code } = await params;

  if (!code || code.length !== 10) {
    return new Response(
      JSON.stringify({ error: 'Invalid short code' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Exactly how your old FastAPI did it
    const fullShortUrl = `http://localhost:3000/shorts/${code}`;

    const pair = await prisma.url_pairs.findFirst({
      where: { url2: fullShortUrl },
    });

    if (!pair) {
      return new Response(
        JSON.stringify({ error: 'Short link not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        url1: pair.url1,
        url2: pair.url2,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Short link lookup error:', error);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
}