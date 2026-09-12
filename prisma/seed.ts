import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD with at least 12 characters before seeding.");

  await prisma.user.upsert({
    where: { email },
    update: { name: "Administrador", passwordHash: await hash(password, 12) },
    create: { email, name: "Administrador", passwordHash: await hash(password, 12) },
  });
  console.log(`Administrator ready: ${email}`);
}

main().finally(() => prisma.$disconnect());
