import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { addStatisticElementPayload, handleIsWinPayload } from "@/types/typesStatistic";
import type { handleIconPayload } from '@/types/typesStatistic';
import { handleBetPayload } from "@/types/typesBalance";

interface StatisticItem {
    numberGame: number;
    result: string | number;
    icon: number[] | string[];
    bet: number;
    moneyWin: number;
    money: number;
}

interface statisticType {
    gameCount: number,
    statistic: StatisticItem[],
    percentWin: number;
    moneyWin: number;
    icon: number[] | string[];
    bet: number;
    isWin: boolean;
    countWin: number
}

const initialState: statisticType = {
    gameCount: 0,
    statistic: [],
    percentWin: 0,
    moneyWin: 0,
    icon: [],
    bet: 0,
    isWin: false,
    countWin: 0
}

export const gameStatistic = createSlice({
    name: 'gameStatistic',
    initialState,
    reducers: {
        addStatisticElement: (state, action:PayloadAction<addStatisticElementPayload>) => {

            const { isWinStat, result, currentBet, moneyWinStat, balanceStat } = action.payload;

            const newElement: StatisticItem = {
                numberGame: state.gameCount,
                result: isWinStat ? "win" : "lose",
                icon: result,
                bet: currentBet,
                moneyWin: moneyWinStat,
                money: balanceStat,
            };

            state.statistic = [...state.statistic, newElement];
        },

        handlePercentWin: (state) => {
            state.percentWin = Math.round((state.countWin / (state.gameCount)) * 100)
        },

        handleIcon: (state, action: PayloadAction<handleIconPayload> ) => {
            const { firstIcon, secondIcon, thirdIcon } = action.payload;
            state.icon = [firstIcon, secondIcon, thirdIcon];
        }, 

        onSpin: (state) => {
            state.gameCount += 1;
        },

        handleBet: (state, action: PayloadAction<handleBetPayload>) => {
            state.bet = action.payload.bet;
        },

        handleIsWin: (state, action: PayloadAction<handleIsWinPayload>) => {
            state.isWin = action.payload.isWin
        },

        handleCountWin: (state) => {
            state.countWin += 1;
        }
    }
})

export const {addStatisticElement, handleIcon, handlePercentWin, onSpin, handleBet, handleIsWin, handleCountWin} = gameStatistic.actions

export const gameStatisticReducer = gameStatistic.reducer;

export default gameStatisticReducer;
