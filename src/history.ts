import { Database, open } from 'sqlite'
import sqlite3 from 'sqlite3'

type RawUrl = {
  id: number
  url: string
  title: string
  visit_count: number
  typed_count: number
  last_visit_time: number
  hidden: number
}
export type Url = Omit<RawUrl, 'last_visit_time'> & {
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

const webkitToUnix = (wkTs: number) => (wkTs - 11644473600000000) / 1000
const unixToWebkit = (unixTs: number) => unixTs * 1000 + 11644473600000000

const convertUrl = (url: RawUrl): Url => {
  const date = new Date(webkitToUnix(url.last_visit_time))
  return { ...url, last_visit_time: date }
}

const GET_URLS_SQL = `
SELECT
  id, url, title, visit_count, typed_count, last_visit_time, hidden
FROM urls
WHERE last_visit_time > ? AND last_visit_time < ?
ORDER BY last_visit_time DESC
LIMIT ?
`

type Db = Database<sqlite3.Database, sqlite3.Statement>

const getHistory = (db: Db, from: number, to: number, limit = 10000) =>
  db.all(GET_URLS_SQL, [from, to, limit])

export async function readHistory(path: string, start: Date, end: Date) {
  const db = await open({ filename: path, driver: sqlite3.Database })
  const rows = await getHistory(db, unixToWebkit(+start), unixToWebkit(+end))

  const urls = rows.filter(isRawUrl).map(convertUrl)

  await db.close()
  return urls
}
