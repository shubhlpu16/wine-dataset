import { WineStats } from '@/utils/use-wines-data'
import './style.css'

interface StatsTableProps {
  columns: string[]
  rows: { [key: string]: WineStats }
  statsType: 'Flavanoids' | 'Gamma'
}
export const StatsTable = ({ columns, rows, statsType }: StatsTableProps) => {
  const meanArray = Object.keys(rows).map((row) => rows[row].mean)
  const medianArray = Object.keys(rows).map((row) => rows[row].median)
  const modeArray = Object.keys(rows).map((row) => rows[row].mode)
  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {columns.map((col) => (
            <th key={col}>Class {col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{statsType} Mean</th>
          {meanArray.map((mean) => (
            <td key={mean}>{mean}</td>
          ))}
        </tr>
        <tr>
          <th>{statsType} Median</th>
          {medianArray.map((median) => (
            <td key={median}>{median}</td>
          ))}
        </tr>
        <tr>
          <th>{statsType} Mode</th>
          {modeArray.map((mode) => (
            <td key={mode}>{mode}</td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
