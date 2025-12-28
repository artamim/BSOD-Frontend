// app/add/actions.js

"use server";

import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import { headers } from 'next/headers';  // ← Add this import

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

function generateShortCode() {
  return randomBytes(5).toString('hex').toUpperCase(); // 10 chars
}

export async function shortenUrl(formData) {
  const url1 = formData.get('url1')?.toString().trim();

  if (!url1 || !url1.startsWith('http')) {
    return { error: 'Please enter a valid URL starting with http:// or https://' };
  }

  // ← Dynamically build the base URL from request headers
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';  // https behind ALB with HTTPS listener
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  // Fallback for local dev (optional)
  // const baseUrl = process.env.NODE_ENV === 'production' 
  //   ? `${protocol}://${host}`
  //   : 'http://localhost:3000';

  try {
    let code;
    let fullShortUrl;

    do {
      code = generateShortCode();
      fullShortUrl = `${baseUrl}/shorts/${code}`;
    } while (
      await prisma.url_pairs.findFirst({
        where: { url2: fullShortUrl },
      })
    );

    const newPair = await prisma.url_pairs.create({
      data: {
        url1,
        url2: fullShortUrl,
      },
    });

    return { url2: newPair.url2 };
  } catch (error) {
    console.error('Error creating short URL:', error);
    return { error: 'Failed to create link. Please try again.' };
  }
}