export interface IAllCardsResponse {
  [key: string]: ICard[];
}

export interface ICard {
  cardId: string;
  cardSet: string;
  dbfId: string;
  locale: string;
  name: string;
  playerClass: string;
  text: string;
  type: string;
  img?: string;
  mechanics?: IMechanics[];
}

export interface IMechanics {
  name: string;
}

export interface ICard {
  cardId: string;
  cardSet: string;
  dbfId: string;
  locale: string;
  name: string;
  playerClass: string;
  text: string;
  type: string;
  mechanics?: IMechanics[];
}

export interface IMechanics {
  name: string;
}

export interface IDefaultScreenProps {
  [key: string]: any
}