// Function to calculate mean
export const calculateMean = (data: number[]): number => {
  return data.reduce((a, b) => a + b) / data.length
}

// Function to calculate median
export const calculateMedian = (data: number[]): number => {
  const sortedData = data.sort((a, b) => a - b)
  return sortedData[Math.floor(sortedData.length / 2)]
}

//Function to calculate mode
export const calculateMode = (data: number[]): number => {
  const frequencyArray: { [key: string]: number } = {}
  data.forEach((item) => {
    frequencyArray[item] = (frequencyArray[item] || 0) + 1
  })
  let maxFrequency = 0
  let mode = 0
  Object.keys(frequencyArray).forEach((key) => {
    if (frequencyArray[key] > maxFrequency) {
      maxFrequency = frequencyArray[key]
      mode = Number(key)
    }
  })
  return mode
}

// Utility To parse array values to float from number or string
export const convertArrayToFloatArray = (arr: (number | string)[]) => {
  return arr.map((item) => parseFloat(item.toString()))
}

// Utility to format the decimal upto 3 decimal places and parse them to float
export const formatToDecimal = (number: number) => {
  return parseFloat(number.toFixed(3))
}
