import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { BASE_MONEY } from '@/constants'
import type { CalcData, handleMoneyPayload } from '@/types/typesBalance'
import type { handleMoneyWinPayload } from '@/types/typesBalance'
import axios from 'axios'

export const fetchMoneyWin = createAsyncThunk('/fetchMoneyWin', async (body: CalcData) => {
  try {
    console.log('here')
    const { SYMBOLS, countSame, currentBet } = body

    const response = await axios.post('http://localhost:3000/moneywin', {
      SYMBOLS,
      countSame: Object.fromEntries(countSame),
      currentBet,
    })

    return response.data
  } catch {
    throw new Error('nichogo ne poluchilos')
  }
})

interface MoneyLogicType {
  money: number
  moneyWin: number
}

const initialState: MoneyLogicType = {
  money: BASE_MONEY,
  moneyWin: 0,
}

export const moneyLogic = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    handleMoney: (state, action: PayloadAction<handleMoneyPayload>) => {
      const { amount } = action.payload
      if (state.money >= amount) {
        state.money = state.money - amount
      }
    },
    handleMoneyWin: (state, action: PayloadAction<handleMoneyWinPayload>) => {
      const { moneyWin } = action.payload
      state.moneyWin = moneyWin
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoneyWin.fulfilled, (state, action) => {
      const amount = -action.payload as number

      if (state.money >= amount) {
        state.money = state.money - amount
      }

      state.moneyWin = amount
    })
  },
})

export const { handleMoney, handleMoneyWin } = moneyLogic.actions

export const moneyLogicReducer = moneyLogic.reducer

export default moneyLogicReducer
