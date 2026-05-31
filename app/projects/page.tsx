import Panel from '../components/panel'
import DataRow from '../components/data-row'

export const metadata = {
  title: 'Works - Rei Utsuho'
}

const works = [
  { index: '01', title: 'Mead-of-Poetry 诗之蜜酒', category: 'Board Game / Mythology', year: '2023' },
  { index: '02', title: 'CODE:QUEEN 代号σ', category: 'Game / SLG / Fantasy', year: '2025' },
  { index: '03', title: 'API-Disruptor', category: 'Dev Tool / REST API', year: '2022' },
  { index: '04', title: 'Touhou-M1-comedy-series', category: 'Translation / Comedy', year: '2021' },
  { index: '05', title: 'Humankind 测评与分析', category: 'Essay / Game Analysis', year: '2021' },
  { index: '06', title: '"1984" Dust Jacket Design', category: 'Graphic Design', year: '2020' },
  { index: '07', title: '东方斑樱汉化 Madarazakura', category: 'Translation / STG', year: '2019' }
]

export default function Projects() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <Panel title="WORKS" count="7 ENTRIES">
          {works.map((work) => (
            <DataRow
              key={work.index}
              index={work.index}
              title={work.title}
              category={work.category}
              year={work.year}
            />
          ))}
        </Panel>
      </div>
    </div>
  )
}
