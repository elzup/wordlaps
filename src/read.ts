import { writeFileSync } from 'fs'
import { readHistory } from './history'

const DB_PATH = './db/History-1'
const OUT_PATH = './dist/db.json'

async function main() {
  const startDate = new Date('2024-04-01T00:00:00.000+09:00')
  const endDate = new Date(+startDate + 1 * 24 * 60 * 60 * 1000)
  const urls = await readHistory(DB_PATH, startDate, endDate)

  await saveFile(urls)
  console.log(`saved: ${OUT_PATH}`)
}

const saveFile = (urls: any) => writeFileSync(OUT_PATH, JSON.stringify(urls))

main()
