import axios, { CancelTokenSource } from 'axios';
import { IAllCardsResponse, ICard } from '../interface';

let cancelToken: CancelTokenSource
const caller = axios.create({
    baseURL: 'https://omgvamp-hearthstone-v1.p.rapidapi.com',
    headers: {
        'x-rapidapi-key': 'd2e5cfe6a8msh0a81dbe97b47e97p120f1bjsn69dddc324ef1',
        'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    },
    timeout: 1000 * 60,
});

export const getCards = async (): Promise<IAllCardsResponse> => {

    if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.")
    }

    cancelToken = axios.CancelToken.source()
    const res = await caller.get<IAllCardsResponse>('cards').catch(res => res.data && res);
    return res.data;
};

export const getSearchCards = async (query: string): Promise<ICard[]> => {

    if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.")
    }

    cancelToken = axios.CancelToken.source()
    const res = await caller.get<ICard[]>(`cards/search/${query}`).catch(res => res.data && res);
    return res.data;
};