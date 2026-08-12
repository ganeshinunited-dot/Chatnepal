import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Production-ready connection pooling configuration
const connectionString = process.env.DATABASE_URL;

// We only want to throw if we're actually in production AND trying to use the DB.
// During build time (static analysis), we can fallback to a dummy string to avoid crashing the build.
const isProduction = process.env.NODE_ENV === 'production';
const effectiveConnectionString = connectionString || (isProduction ? '' : 'postgresql://postgres:postgres@localhost:5432/chatnepal');

const pool = new Pool({ 
  connectionString: effectiveConnectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (!isProduction) globalForPrisma.prisma = prisma;
