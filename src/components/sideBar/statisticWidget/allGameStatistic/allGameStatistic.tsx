import { useEffect } from 'react'
import styles from './allGameStatistic.module.scss'
import { StatisticItem } from '@/App'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/features/store'
import { addStatisticElement } from '@/features/gameStatistic'
import { percentWinSelector } from '@/features/gameStatistic/selector'
import { moneyWinSelector } from '@/features/balance/selector'

interface AllGameStatisticProps {
  props: StatisticItem
}

export default function AllGameStatistic({ props }: AllGameStatisticProps) {
  const dispatch = useDispatch<AppDispatch>()

  const moneyWin = useSelector(moneyWinSelector)

  useEffect(() => {
    console.log('USE EFFECT WORK')
    if (props.numberGame === 0) {
      return
    }
    dispatch(
      addStatisticElement({
        isWinStat: false,
        result: ['result'],
        currentBet: 0,
        moneyWinStat: moneyWin,
        balanceStat: 0,
      }),
    )
  }, [moneyWin])

  return (
    <div
      className={`${styles['item-stat']} ${props.result === 'win' ? styles['item-green'] : styles['item-red']}`}
    >
      <p>
        Game Number: <span>{props.numberGame}</span>
      </p>
      <p>
        Result: <span>{props.result}</span>
      </p>
      <p>
        Result Icon: <span>{props.icon}</span>
      </p>
      <p>
        Bet: <span>{props.bet}</span>
      </p>
      <p>
        Money Win: <span>{props.moneyWin}</span>
      </p>
      <p>
        Balance: <span>{props.money}</span>
      </p>
    </div>
  )
}
