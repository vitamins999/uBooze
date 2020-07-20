import { SupermarketProduct } from './utils/types';

export interface Beers {
  lager: SupermarketProduct[];
  ale: SupermarketProduct[];
  craft?: SupermarketProduct[];
  cider: SupermarketProduct[];
  stout?: SupermarketProduct[];
  glutenFree?: SupermarketProduct[];
  lowAlcohol?: SupermarketProduct[];
}

export interface Wines {
  red: SupermarketProduct[];
  white: SupermarketProduct[];
  rose: SupermarketProduct[];
  champagneSparkling: SupermarketProduct[];
  boxes: SupermarketProduct[];
  fruity?: SupermarketProduct[];
  dessert?: SupermarketProduct[];
  fortifiedVermouth: SupermarketProduct[];
  smallBottles: SupermarketProduct[];
  lowAlcohol?: SupermarketProduct[];
}

export interface Spirits {
  gin: SupermarketProduct[];
  whisky: SupermarketProduct[];
  vodka: SupermarketProduct[];
  rum: SupermarketProduct[];
  brandyCognac: SupermarketProduct[];
  tequilaLiqueur: SupermarketProduct[];
  premix: SupermarketProduct[];
  lowAlcohol?: SupermarketProduct[];
}
