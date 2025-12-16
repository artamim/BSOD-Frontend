import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// Singleton pattern – important for Next.js to avoid too many connections
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function GET() {
  try {
    const pairs = await prisma.url_pairs.findMany({
      orderBy: { id: 'desc' },
    });

    const formattedPairs = pairs.map((p) => ({
      id: Number(p.id),          // BigInt → Number for JSON
      original_url: p.url1,
      short_url: p.url2,
    }));

    return new Response(JSON.stringify(formattedPairs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching URL pairs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch links' }), {
      status: 500,
    });
  }
}