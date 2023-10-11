// A custom hook to calculate statistical data for wines according to the stat type either 'Flavanoids' or 'Gamma'
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
    const wineClasses: { [key: string]: (string | number)[] } = {} // data structure to store wine class wise with their particular value

    /*
     This transforms the wine data to make and object of classes of wine with data 
      like
      wineClasses={
        1:[...flavanoids or gamma values]
        2:[...flavanoids or gamma values]
        3:[...flavanoids or gamma values]
      }
    */
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

    const classWiseStats: { [key: string]: WineStats } = {} //data structure to store stats of class

    /*
    Transforms object
    classWiseStats={
      1:{
        mean:...,
        median:...,
        mode:....,
      }
      2:{
        mean:...,
        median:...,
        mode:....,
      }
      3:{
        mean:...,
        median:...,
        mode:....,
      }
    }
    */

    Object.keys(wineClasses).forEach((key) => {
      const floatArray = convertArrayToFloatArray(wineClasses[key]) // converting into floats to make data consistent
      // calculating stats
      classWiseStats[key] = {
        mean: formatToDecimal(calculateMean(floatArray)),
        median: formatToDecimal(calculateMedian(floatArray)),
        mode: formatToDecimal(calculateMode(floatArray))
      }
    })

    return { classWiseStats, wineClasses: Object.keys(wineClasses) } //return class wise stats and classes
  }, [])

  return wineStats
}
