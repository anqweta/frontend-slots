import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './slotMachine.module.scss'
import Dots from './dots'
import ReelsBoard from './reelsBoard/reelsBoard'
import BetSelector from './betSelector/betSelector'
import { SYMBOLS } from '@/constants'
import { calcMoneyWin } from '@/utils/helper'
import { handleMoneyWin, handleMoney } from '@/features/balance'
import { handleIcon, handlePercentWin, onSpin } from '@/features/gameStatistic'
import { addStatisticElement } from '@/features/gameStatistic'
import { moneySelector } from '@/features/balance/selector'
import { AppDispatch } from '@/features/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
//import axios from 'axios'

interface SpanClassItem {
  class: string
}

const spanClass: SpanClassItem[] = [
  { class: styles['span-red'] },
  { class: styles['span-yellow'] },
  { class: styles['span-blue'] },
]
let countWin: number = 0

export default function SlotMachine() {
  const dispatch = useDispatch<AppDispatch>()
  const [currentBet, setCurrentBet] = useState<number>(0)
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [isReel, setReel] = useState<number[]>([0, 0, 0])
  const [isWin, setWin] = useState<boolean>(false)

  const money = useSelector(moneySelector)

  const spinClick = (): void => {
    setWin(false)

    if (money < currentBet) {
      alert('Денег нет!')
      return
    }

    if (currentBet === 0) {
      return
    }

    dispatch(handleMoney({ amount: currentBet }))

    if (isSpinning) {
      return
    }

    const findIcon = (): number => Math.floor(Math.random() * SYMBOLS.length)

    const newReel: number[] = Array.from({ length: 3 }, () => findIcon())

    console.log('ІНДЕКСИ ІКОНОК: ' + newReel)

    const countSame: Map<number, number> = new Map<number, number>()

    for (const item of newReel) {
      countSame.set(item, (countSame.get(item) || 0) + 1)
    }

    const fetchMoneyWin = createAsyncThunk('/fetchMoneyWin', async () => {
      try {
        const response = await axios.get('http://localhost:3000/moneywin');
        return response;
      } catch {
        throw new Error('nichogo ne poluchilos')
      }
    })

    console.log(countSame)

    setReel(newReel)

    dispatch(onSpin())
    setIsSpinning(true)

    const result: string[] = [
      SYMBOLS[newReel[0]].icon,
      SYMBOLS[newReel[1]].icon,
      SYMBOLS[newReel[2]].icon,
    ]

    setTimeout(() => {
      dispatch(
        handleIcon({
          firstIcon: SYMBOLS[newReel[0]].icon,
          secondIcon: SYMBOLS[newReel[1]].icon,
          thirdIcon: SYMBOLS[newReel[2]].icon,
        }),
      )

      let moneyWinStat: number = 0

      setIsSpinning(false)

      const isWinStat: boolean = countSame.size <= 2
      console.log(isWinStat + 'ЧИ Є ПЕРЕМОГА')

      if (isWinStat) {
        setWin(isWinStat)
        const { moneyWin } = fetchMoneyWin()
        console.log('Ви вийграли, ФІНАЛЬНА кількість грошей: ' + moneyWin)
        handleMoneyWin({ moneyWin: moneyWin })
        dispatch(handleMoney({ amount: -moneyWin }))
        moneyWinStat = moneyWin
        countWin++
      }

      const balanceStat: number = money - currentBet + moneyWinStat
      console.log('КІЛЬКІСТЬ ПЕРЕМОГ: ' + countWin)

      dispatch(handlePercentWin({ countWin: countWin }))

      dispatch(addStatisticElement({ isWinStat, result, currentBet, moneyWinStat, balanceStat }))
    }, 5200)

    console.log(isWin + 'RESULT GAME')
  }

  return (
    <div className={styles.slotMachine}>
      <h2 className={styles.title}>
        {spanClass.map((item, index) => (
          <Dots key={index} props={item} />
        ))}
        LUCKY SPIN{' '}
        {spanClass.map((item, index) => (
          <Dots key={index} props={item} />
        ))}
      </h2>
      <ReelsBoard positions={isReel} isSpinning={isSpinning} isWin={isWin} />
      <BetSelector setCurrentBet={setCurrentBet} />
      <button onClick={spinClick} disabled={isSpinning} className={styles['button-spin']}>
        SPIN
      </button>
    </div>
  )
}
