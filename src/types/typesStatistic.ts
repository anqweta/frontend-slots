export type handlePercentWinPayload = {
  countWin: number
}

export type handleIconPayload = {
  firstIcon: string
  secondIcon: string
  thirdIcon: string
}

export type handleIsWinPayload = {
  isWin: boolean
}

export type handleCountWinPayload = {
  countWin: number;
}

export type addStatisticElementPayload = {
  isWinStat: boolean
  result: string[] | number[]
  currentBet: number
  moneyWinStat: number
  balanceStat: number
}
