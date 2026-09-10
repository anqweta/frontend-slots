import { RootState } from "@/features/store";

export const percentWinSelector = (state: RootState) => state.gameStatistic.percentWin;

export const moneyWinSelector = (state: RootState) => state.gameStatistic.moneyWin;

export const gameCountSelector = (state: RootState) => state.gameStatistic.gameCount;

export const iconSelector = (state: RootState) => state.gameStatistic.icon;

export const statisticSelector = (state: RootState) => state.gameStatistic.statistic;

export const betSelector = (state: RootState) => state.gameStatistic.bet;

export const isWinSelector = (state: RootState) => state.gameStatistic.isWin;

export const countWinSelector = (state: RootState) => state.gameStatistic.countWin;