import { useDispatch, useSelector } from 'react-redux'

import InfoItem from './infoItem/infoItem'
import AllGameStatistic from './allGameStatistic/allGameStatistic'
import styles from './statisticWidget.module.scss'
import {
  betSelector,
  gameCountSelector,
  iconSelector,
  isWinSelector,
  percentWinSelector,
  statisticSelector,
} from '@/features/gameStatistic/selector'
import { useEffect } from 'react'
import { AppDispatch } from '@/features/store'
import { addStatisticElement, handlePercentWin } from '@/features/gameStatistic'
import { moneySelector } from '@/features/balance/selector'
import { moneyWinSelector } from '@/features/balance/selector'

interface StatisticInfoItem {
  title: string
  number: number | string | number[] | string[]
}

export default function StatisticWidget() {
  const icon = useSelector(iconSelector)
  const statistic = useSelector(statisticSelector)

  const dispatch = useDispatch<AppDispatch>()

  const moneyWin = useSelector(moneyWinSelector)
  const gameCount = useSelector(gameCountSelector)
  const bet = useSelector(betSelector)
  const money = useSelector(moneySelector)
  const isWin = useSelector(isWinSelector)

  const percentWin = useSelector(percentWinSelector)

  useEffect(() => {
    if (gameCount === 0) {
      return
    }
    dispatch(
      addStatisticElement({
        isWinStat: isWin,
        result: icon,
        currentBet: bet,
        moneyWinStat: moneyWin,
        balanceStat: money,
      }),
    )
  }, [gameCount])

  const statisticInfo: StatisticInfoItem[] = [
    { title: 'Counf of game: ', number: gameCount },
    { title: 'Total win: ', number: percentWin + '%' },
    { title: 'Icon: ', number: icon },
  ]

  return (
    <div className={styles.statistic}>
      <h2>STATISTIC</h2>
      <div className={styles.statistic__info}>
        {statisticInfo.map((item, index) => (
          <InfoItem key={index} props={item} />
        ))}
      </div>
      {statistic.map((item, index) => (
        <AllGameStatistic key={index} props={item} />
      ))}
    </div>
  )
}
