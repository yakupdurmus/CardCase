import axios from 'axios';
import { IAllCardsResponse, ICard } from '../interface';

const caller = axios.create({
    baseURL: 'https://omgvamp-hearthstone-v1.p.rapidapi.com',
    headers: {
        'x-rapidapi-key': 'dedd334679msh760fd44007226ecp1ff03ajsnd64b7879064d',
        'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    },
    timeout: 1000 * 60,
});

export const getCards = async (): Promise<IAllCardsResponse> => {

    const res = await caller.get<IAllCardsResponse>('cards').catch(res => res.data && res);
    return res.data;
};

export const searchCard = async (query: string): Promise<ICard[]> => {
    const res = await caller.get<ICard[]>(`cards/search/${query}`).catch(res => res.data && res);
    return res.data;
};