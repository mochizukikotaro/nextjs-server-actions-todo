import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.deleteMany();
  await prisma.todo.createMany({
    data: [
      {
        name: "Learn Prisma",
        score: 1,
      },
      {
        name: "Learn Next.js",
        score: 2,
      },
      {
        name: "Build a fullstack app",
        score: 5,
      },
      {
        name: "Deploy to Vercel",
        score: 2,
      },
      {
        name: "Make a cake",
        score: 10,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
