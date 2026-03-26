import { PrismaClient } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

let prismaInstance: PrismaClient | undefined;

// Lazy-Initialisierung: kein DB-Crash beim Server-Start wenn DATABASE_URL fehlt
export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    prismaInstance = new PrismaClient({ adapter });
  }
  return prismaInstance;
}
