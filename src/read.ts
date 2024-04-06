import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'

const prisma = new PrismaClient()

async function main() {
  const urls = await prisma.url.findMany()

  await writeFileSync('./dist/db.json', JSON.stringify(urls))
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

function convertWebkitTimestampToJsDate(webkitTimestamp: number) {
  const unixTimestampMillis = (webkitTimestamp - 11644473600000000) / 1000
  return new Date(unixTimestampMillis)
}

const webkitTimestamp = 13276246021066760
const date = convertWebkitTimestampToJsDate(webkitTimestamp)

console.log(date) // 出力: 実際の日付と時刻
