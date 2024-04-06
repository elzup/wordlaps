import { writeFileSync } from 'fs'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

const DB_PATH = './db/History'
const OUT_PATH = './dist/db.json'

type RawUrl = {
  id: number
  url: string
  title: string
  visit_count: number
  typed_count: number
  last_visit_time: string
  hidden: number
}
type Url = Omit<RawUrl, 'last_visit_time'> & {
  last_visit_time: Date
}
const isRawUrl = (url: any): url is RawUrl => {
  return (
    typeof url === 'object' &&
    typeof url.id === 'number' &&
    typeof url.url === 'string' &&
    typeof url.title === 'string' &&
    typeof url.visit_count === 'number' &&
    typeof url.typed_count === 'number' &&
    typeof url.last_visit_time === 'number' &&
    typeof url.hidden === 'number'
  )
}

const webkittimeToUnix = (wkTs: bigint) => {
  const webkitTimestamp = BigInt(wkTs)
  return Number(webkitTimestamp - BigInt('11644473600000000')) / 1000000
}

const convertUrl = (url: RawUrl): Url => {
  const webkitTimestamp = BigInt(url.last_visit_time)
  const date = new Date(webkittimeToUnix(webkitTimestamp))
  return { ...url, last_visit_time: date }
}

const GET_URLS_SQL = `
SELECT
  id,
  url,
  title,
  visit_count,
  typed_count,
  last_visit_time,
  hidden
FROM urls;
`

async function main() {
  // データベースを開く
  const db = await open({ filename: DB_PATH, driver: sqlite3.Database })
  const rows = await db.all(GET_URLS_SQL)

  const urls = rows.filter(isRawUrl).map(convertUrl)

  await saveFile(urls)
  console.log(`saved: ${OUT_PATH}`)
  // データベースを閉じる
  await db.close()
}

const saveFile = (urls: any) => writeFileSync(OUT_PATH, JSON.stringify(urls))

main()
