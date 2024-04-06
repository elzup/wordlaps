import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

type RawUrl = {
  id: number
  url: string
  title: string
  visit_count: number
  typed_count: number
  last_visit_time: string
  hidden: number
}
type Url = RawUrl & {
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
    typeof url.last_visit_time === 'string' && // last_visit_time は string として扱う
    typeof url.hidden === 'number'
  )
}

async function main() {
  // データベースを開く
  const db = await open({
    filename: 'path/to/your/database.db',
    driver: sqlite3.Database,
  })

  // データを取得する
  const rows = await db.all(`
    SELECT
      id,
      url,
      title,
      visit_count,
      typed_count,
      last_visit_time,
      hidden
    FROM
      urls
  `)

  const webkittimeToUnix = (wkTs: bigint) => {
    const webkitTimestamp = BigInt(wkTs)
    return Number(webkitTimestamp - BigInt('11644473600000000')) / 1000000
  }

  // データを変換して出力
  const urls = rows.filter(isRawUrl).map((row) => {
    const webkitTimestamp = BigInt(row.last_visit_time)
    const date = new Date(webkittimeToUnix(webkitTimestamp))
    return { ...row, last_visit_time: date }
  })

  await saveFile(urls.slice(0, 20))
  // データベースを閉じる
  await db.close()
}

import { writeFileSync } from 'fs'

const saveFile = (urls: any) =>
  writeFileSync('./dist/db.json', JSON.stringify(urls))
