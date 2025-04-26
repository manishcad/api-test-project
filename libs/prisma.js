import { PrismaClient } from '@prisma/client';

let prisma;

if (typeof window === 'undefined') {
  // Ensure only one instance is used in development (for hot reloading)
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  // On client side (browser) – Prisma should not be used
  throw new Error("Prisma should not be used in the browser");
}

export default prisma;
