import { useState } from 'react'

import styles from './betSelector.module.scss'
import Bet from './bet/bet'
import { useDispatch, useSelector } from 'react-redux'
import { betSelector } from '@/features/gameStatistic/selector'
import { handleBet } from '@/features/gameStatistic'

interface BetItem {
  id: number
  bet: number
}

const bets: BetItem[] = [
  { id: 1, bet: 25 },
  { id: 2, bet: 50 },
  { id: 3, bet: 100 },
  { id: 4, bet: 200 },
]

export default function BetSelector() {
  const dispatch = useDispatch()

  const [activeId, setActiveId] = useState<number>(0)

  const selectBet = (item: BetItem): void => {
    const { id, bet } = item
    setActiveId(id)
    dispatch(handleBet({ bet }))
  }

  return (
    <div className={styles.betSelector}>
      <span>BET</span>
      {bets.map((item, index) => (
        <Bet
          key={index}
          props={item}
          isActive={activeId === item.id}
          onClick={() => selectBet(item)}
        />
      ))}
    </div>
  )
}
