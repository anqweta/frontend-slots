import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './slotMachine.module.scss'
import Dots from './dots'
import ReelsBoard from './reelsBoard/reelsBoard'
import BetSelector from './betSelector/betSelector'
import { SYMBOLS } from '@/constants'
import { handleMoney, fetchMoneyWin } from '@/features/balance'
import { handleCountWin, handleIcon, handlePercentWin, onSpin } from '@/features/gameStatistic'
import { moneySelector } from '@/features/balance/selector'
import { AppDispatch } from '@/features/store'
import { betSelector, isWinSelector } from '@/features/gameStatistic/selector'
import { handleIsWin } from '@/features/gameStatistic'

interface SpanClassItem {
  class: string
}

const spanClass: SpanClassItem[] = [
  { class: styles['span-red'] },
  { class: styles['span-yellow'] },
  { class: styles['span-blue'] },
]

export default function SlotMachine() {
  const dispatch = useDispatch<AppDispatch>()
  const currentBet = useSelector(betSelector)
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [isReel, setReel] = useState<number[]>([0, 0, 0])

  const countWin = useSelector(handleIsWin)
  const money = useSelector(moneySelector)
  const isWin = useSelector(isWinSelector)
  let countWinStat = 0
  const spinClick = (): void => {
    let isWinStat = false

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

    console.log(countSame)

    setReel(newReel)

    setIsSpinning(true)

    setTimeout(async () => {
      dispatch(
        handleIcon({
          firstIcon: SYMBOLS[newReel[0]].icon,
          secondIcon: SYMBOLS[newReel[1]].icon,
          thirdIcon: SYMBOLS[newReel[2]].icon,
        }),
      )

      setIsSpinning(false)
      isWinStat = countSame.size <= 2
      dispatch(handleIsWin({ isWin: isWinStat }))
      console.log('ЧИ БУЛА ПЕРЕМОГА: ' + isWin)

      if (isWinStat) {
        await dispatch(fetchMoneyWin({ currentBet, countSame, SYMBOLS })).unwrap()
        dispatch(handleCountWin())
        console.log('БУЛА ДОДАНА ПЕРЕМОГА!!! КІЛЬКІСТЬ ПЕРЕМОГ: ' + countWinStat)
      }
      dispatch(onSpin())
      dispatch(handlePercentWin())
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
      <BetSelector />
      <button onClick={spinClick} disabled={isSpinning} className={styles['button-spin']}>
        SPIN
      </button>
    </div>
  )
}
