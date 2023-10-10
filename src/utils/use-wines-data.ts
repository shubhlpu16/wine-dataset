import { wines } from '@/wines'
import {
  calculateMean,
  calculateMode,
  calculateMedian,
  convertArrayToFloatArray,
  formatToDecimal
} from '@/utils/math-functions'
import { useMemo } from 'react'

export interface WineStats {
  mean: number
  mode: number
  median: number
}

interface WineArgs {
  statType?: 'Flavanoids' | 'Gamma'
}

export const useWineData = ({ statType = 'Flavanoids' }: Partial<WineArgs>) => {
  const wineStats = useMemo(() => {
    const wineClasses: { [key: string]: (string | number)[] } = {}

    wines.forEach((wine) => {
      const key = wine['Alcohol']
      const flavanoids = parseFloat(wine['Flavanoids'] as string)
      let statValue
      if (statType === 'Gamma') {
        const ash = parseFloat(wine['Ash'] as string)
        const hue = parseFloat(wine['Hue'] as string)
        const magnesium = parseFloat(wine['Magnesium'] as string)
        statValue = (ash * hue) / magnesium
      } else {
        statValue = flavanoids
      }
      if (!wineClasses[key]) {
        wineClasses[key] = [statValue]
      } else {
        wineClasses[key] = [...wineClasses[key], statValue]
      }
    })

    const classWiseStats: { [key: string]: WineStats } = {}
    Object.keys(wineClasses).forEach((key) => {
      const floatArray = convertArrayToFloatArray(wineClasses[key])
      classWiseStats[key] = {
        mean: formatToDecimal(calculateMean(floatArray)),
        median: formatToDecimal(calculateMedian(floatArray)),
        mode: formatToDecimal(calculateMode(floatArray))
      }
    })

    return { classWiseStats, wineClasses: Object.keys(wineClasses) }
  }, [])

  return wineStats
}
