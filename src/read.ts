import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const allExamples = await prisma.example.findMany()
  console.log(allExamples)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
