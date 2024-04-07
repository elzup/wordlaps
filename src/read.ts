import { writeFileSync } from 'fs'
import { readHistory } from './history'

const DB_PATH = './db/History-1'
const OUT_PATH = './dist/db.json'

async function main() {
  const urls = await readHistory(DB_PATH)

  await saveFile(urls)
  console.log(`saved: ${OUT_PATH}`)
}

const saveFile = (urls: any) => writeFileSync(OUT_PATH, JSON.stringify(urls))

main()
