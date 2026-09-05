import { RootState } from '@/features/store'

export const moneySelector = (state: RootState) => state.balance.money
export const moneyWinSelector = (state: RootState) => state.balance.moneyWin
