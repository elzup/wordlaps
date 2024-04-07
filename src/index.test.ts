import { Url } from './history'
const mockDatas: Url[] = [
  {
    id: 783343,
    url: 'https://github.com/python-poetry/poetry/issues/8303',
    title:
      'Environment markers with different sources for a dependency · Issue #8303 · python-poetry/poetry',
    visit_count: 4,
    typed_count: 0,
    last_visit_time: '2024-04-01T08:03:23.359Z',
    hidden: 0,
  },
  {
    id: 783341,
    url: 'https://www.google.com/search?q=typing_extensions&oq=typing_extensions+&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBBzM0M2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8',
    title: 'typing_extensions - Google 検索',
    visit_count: 2,
    typed_count: 0,
    last_visit_time: '2024-04-01T07:52:36.654Z',
    hidden: 0,
  },
  {
    id: 783340,
    url: 'https://qiita.com/y-tsutsu/items/54c10e0b2c6b565c887a',
    title: 'Pipenvを使ったPython開発まとめ #Python - Qiita',
    visit_count: 1,
    typed_count: 0,
    last_visit_time: '2024-04-01T06:11:30.926Z',
    hidden: 0,
  },
  {
    id: 783339,
    url: 'https://pipenv-ja.readthedocs.io/ja/translate-ja/advanced.html',
    title: 'Pipenvの進んだ使い方 — pipenv 2018.11.27.dev0 ドキュメント',
    visit_count: 1,
    typed_count: 0,
    last_visit_time: '2024-04-01T06:06:20.619Z',
    hidden: 0,
  },
].map((v) => ({ ...v, last_visit_time: new Date(v.last_visit_time) }))

test('a', () => {
  const user = {
    id: 1,
    name: 'John Doe',
  }
  expect(user).toMatchInlineSnapshot(`
{
  "id": 1,
  "name": "John Doe",
}
`)
})
