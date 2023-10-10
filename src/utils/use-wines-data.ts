import { wines, type Wine } from '@/wines'
import {
  calculateMean,
  calculateMode,
  calculateMedian,
  convertArrayToFloatArray,
  formatToDecimal
} from '@/utils/math-functions'
import { useMemo } from 'react'

interface WineStats {
  mean: number
  mode: number
  median: number
}

export const useWineData = () => {
  const wineStats = useMemo(() => {
    const wineClasses: { [key: string]: (string | number)[] } = {}

    wines.forEach((wine) => {
      const key = wine['Alcohol']
      const flavanoids = wine['Flavanoids']
      if (!wineClasses[key]) {
        wineClasses[key] = [flavanoids]
      } else {
        wineClasses[key] = [...wineClasses[key], flavanoids]
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
