import { useEffect } from 'react'
import styles from './allGameStatistic.module.scss'
import { StatisticItem } from '@/App'

interface AllGameStatisticProps {
  props: StatisticItem
}

export default function AllGameStatistic({ props }: AllGameStatisticProps) {


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
