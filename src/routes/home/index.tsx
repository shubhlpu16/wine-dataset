import { useWineData } from '@/utils/use-wines-data'
import { StatsTable } from '@/components/stats-table'
import './ home.css'

function Home() {
  // Get flavanoids stats
  const { wineClasses, classWiseStats: flavanoidsStats } = useWineData({
    statType: 'Flavanoids'
  })
  // Get Gamma Stats
  const { classWiseStats: gammaStats } = useWineData({ statType: 'Gamma' })
  return (
    <div className="App">
      <h1>Wine Stats</h1>
      <StatsTable
        columns={wineClasses}
        rows={flavanoidsStats}
        statsType="Flavanoids"
      />
      <StatsTable columns={wineClasses} rows={gammaStats} statsType="Gamma" />
    </div>
  )
}

export default Home
