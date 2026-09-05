import { SymbolItem } from '@/constants'

export type handleMoneyPayload = {
  amount: number
}

export type handleMoneyWinPayload = {
  moneyWin: number
}

export interface CalcData {
  currentBet: number
  countSame: Map<number, number>
  SYMBOLS: SymbolItem[]
}
