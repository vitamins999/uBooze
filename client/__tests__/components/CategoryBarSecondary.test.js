/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import CategoryBarSecondary from '../../components/CategoryBarSecondary';

const testLinkElement = (primary, secondary, testid, isValidLink) => {
  // Convert boolean to a string
  isValidLink = isValidLink ? 'true' : 'false';

  render(<CategoryBarSecondary primary={primary} secondary={secondary} />);
  const linkElement = screen.getByTestId(`link-${testid}-${isValidLink}`);
  expect(linkElement).toBeInTheDocument();
};

describe('Secondary Category Bar Component', () => {
  it('should render the component', () => {
    render(<CategoryBarSecondary primary={'beer'} secondary={'allBeer'} />);
    const sectionElement = screen.getByTestId('section-main-secondary');
    expect(sectionElement).toBeInTheDocument();
  });

  // Beer
  it('should render All Beer button as not clickable if primary prop is "beer" and secondary prop is "allBeer"', () => {
    testLinkElement('beer', 'allBeer', 'allbeer', false);
  });

  it('should render All Beer button as clickable if primary prop is "beer" and secondary prop is not "allBeer"', () => {
    testLinkElement('beer', 'allBeer', 'lager', true);
  });

  it('should render Lager button as not clickable if primary prop is "beer" and secondary prop is "lager"', () => {
    testLinkElement('beer', 'lager', 'lager', false);
  });

  it('should render Lager button as clickable if primary prop is "beer" and secondary prop is not "lager"', () => {
    testLinkElement('beer', 'allBeer', 'lager', true);
  });

  it('should render Ale button as not clickable if primary prop is "beer" and secondary prop is "ale"', () => {
    testLinkElement('beer', 'ale', 'ale', false);
  });

  it('should render Ale button as clickable if primary prop is "beer" and secondary prop is not "ale"', () => {
    testLinkElement('beer', 'allBeer', 'ale', true);
  });

  it('should render Stout button as not clickable if primary prop is "beer" and secondary prop is "stout"', () => {
    testLinkElement('beer', 'stout', 'stout', false);
  });

  it('should render Stout button as clickable if primary prop is "beer" and secondary prop is not "stout"', () => {
    testLinkElement('beer', 'allBeer', 'stout', true);
  });

  it('should render Craft button as not clickable if primary prop is "beer" and secondary prop is "craft"', () => {
    testLinkElement('beer', 'craft', 'craft', false);
  });

  it('should render Craft button as clickable if primary prop is "beer" and secondary prop is not "craft"', () => {
    testLinkElement('beer', 'allBeer', 'craft', true);
  });

  it('should render Cider button as not clickable if primary prop is "beer" and secondary prop is "cider"', () => {
    testLinkElement('beer', 'cider', 'cider', false);
  });

  it('should render Cider button as clickable if primary prop is "beer" and secondary prop is not "cider"', () => {
    testLinkElement('beer', 'allBeer', 'cider', true);
  });

  it('should render Low Alcohol Beer button as not clickable if primary prop is "beer" and secondary prop is "lowAlcoholBeer"', () => {
    testLinkElement('beer', 'lowAlcoholBeer', 'lowbeer', false);
  });

  it('should render Low Alcohol Beer button as clickable if primary prop is "beer" and secondary prop is not "lowAlcoholBeer"', () => {
    testLinkElement('beer', 'allBeer', 'lowbeer', true);
  });

  // Wine
  it('should render All Wine button as not clickable if primary prop is "wine" and secondary prop is "allWine"', () => {
    testLinkElement('wine', 'allWine', 'allwine', false);
  });

  it('should render All Wine button as clickable if primary prop is "wine" and secondary prop is not "allWine"', () => {
    testLinkElement('wine', 'red', 'allwine', true);
  });

  it('should render Red Wine button as not clickable if primary prop is "wine" and secondary prop is "red"', () => {
    testLinkElement('wine', 'red', 'redwine', false);
  });

  it('should render Red Wine button as clickable if primary prop is "wine" and secondary prop is not "red"', () => {
    testLinkElement('wine', 'allWine', 'redwine', true);
  });

  it('should render White Wine button as not clickable if primary prop is "wine" and secondary prop is "white"', () => {
    testLinkElement('wine', 'white', 'whitewine', false);
  });

  it('should render White Wine button as clickable if primary prop is "wine" and secondary prop is not "white"', () => {
    testLinkElement('wine', 'allWine', 'whitewine', true);
  });

  it('should render Rose button as not clickable if primary prop is "wine" and secondary prop is "rose"', () => {
    testLinkElement('wine', 'rose', 'rosewine', false);
  });

  it('should render Rose button as clickable if primary prop is "wine" and secondary prop is not "rose"', () => {
    testLinkElement('wine', 'allWine', 'rosewine', true);
  });

  it('should render Sparkling button as not clickable if primary prop is "wine" and secondary prop is "sparkling"', () => {
    testLinkElement('wine', 'sparkling', 'sparkling', false);
  });

  it('should render Sparkling button as clickable if primary prop is "wine" and secondary prop is not "sparkling"', () => {
    testLinkElement('wine', 'allWine', 'sparkling', true);
  });

  it('should render Wine Boxes button as not clickable if primary prop is "wine" and secondary prop is "wineBoxes"', () => {
    testLinkElement('wine', 'wineBoxes', 'winebox', false);
  });

  it('should render Wine Boxes button as clickable if primary prop is "wine" and secondary prop is not "wineBoxes"', () => {
    testLinkElement('wine', 'allWine', 'winebox', true);
  });

  it('should render Dessert Wine button as not clickable if primary prop is "wine" and secondary prop is "dessert"', () => {
    testLinkElement('wine', 'dessert', 'dessertwine', false);
  });

  it('should render Dessert Wine button as clickable if primary prop is "wine" and secondary prop is not "dessert"', () => {
    testLinkElement('wine', 'allWine', 'dessertwine', true);
  });

  it('should render Fortified Wine button as not clickable if primary prop is "wine" and secondary prop is "fortified"', () => {
    testLinkElement('wine', 'fortified', 'fortifiedwine', false);
  });

  it('should render Fortified Wine button as clickable if primary prop is "wine" and secondary prop is not "fortified"', () => {
    testLinkElement('wine', 'allWine', 'fortifiedwine', true);
  });

  it('should render Small Wine Bottles button as not clickable if primary prop is "wine" and secondary prop is "smallBottles"', () => {
    testLinkElement('wine', 'smallBottles', 'smallwine', false);
  });

  it('should render Small Wine Bottles button as clickable if primary prop is "wine" and secondary prop is not "smallBottles"', () => {
    testLinkElement('wine', 'allWine', 'smallwine', true);
  });

  it('should render Low Alcohol Wine button as not clickable if primary prop is "wine" and secondary prop is "lowAlcoholWine"', () => {
    testLinkElement('wine', 'lowAlcoholWine', 'lowwine', false);
  });

  it('should render Low Alcohol Wine button as clickable if primary prop is "wine" and secondary prop is not "lowAlcoholWine"', () => {
    testLinkElement('wine', 'allWine', 'lowwine', true);
  });

  // Spirits

  it('should render All Spirits button as not clickable if primary prop is "spirits" and secondary prop is "allSpirits"', () => {
    testLinkElement('spirits', 'allSpirits', 'allspirits', false);
  });

  it('should render All Spirits button as clickable if primary prop is "spirits" and secondary prop is not "allSpirits"', () => {
    testLinkElement('spirits', 'gin', 'allspirits', true);
  });

  it('should render Gin button as not clickable if primary prop is "spirits" and secondary prop is "gin"', () => {
    testLinkElement('spirits', 'gin', 'gin', false);
  });

  it('should render Gin button as clickable if primary prop is "spirits" and secondary prop is not "gin"', () => {
    testLinkElement('spirits', 'allSpirits', 'gin', true);
  });

  it('should render Whisky button as not clickable if primary prop is "spirits" and secondary prop is "whisky"', () => {
    testLinkElement('spirits', 'whisky', 'whisky', false);
  });

  it('should render Whisky button as clickable if primary prop is "spirits" and secondary prop is not "whisky"', () => {
    testLinkElement('spirits', 'allSpirits', 'whisky', true);
  });

  it('should render Vodka button as not clickable if primary prop is "spirits" and secondary prop is "vodka"', () => {
    testLinkElement('spirits', 'vodka', 'vodka', false);
  });

  it('should render Vodka button as clickable if primary prop is "spirits" and secondary prop is not "vodka"', () => {
    testLinkElement('spirits', 'allSpirits', 'vodka', true);
  });

  it('should render Rum button as not clickable if primary prop is "spirits" and secondary prop is "rum"', () => {
    testLinkElement('spirits', 'rum', 'rum', false);
  });

  it('should render Rum button as clickable if primary prop is "spirits" and secondary prop is not "rum"', () => {
    testLinkElement('spirits', 'allSpirits', 'rum', true);
  });

  it('should render Brandy button as not clickable if primary prop is "spirits" and secondary prop is "brandy"', () => {
    testLinkElement('spirits', 'brandy', 'brandy', false);
  });

  it('should render Brandy button as clickable if primary prop is "spirits" and secondary prop is not "brandy"', () => {
    testLinkElement('spirits', 'allSpirits', 'brandy', true);
  });

  it('should render Liqueurs button as not clickable if primary prop is "spirits" and secondary prop is "liqueurs"', () => {
    testLinkElement('spirits', 'liqueurs', 'liqueurs', false);
  });

  it('should render Liqueurs button as clickable if primary prop is "spirits" and secondary prop is not "liqueurs"', () => {
    testLinkElement('spirits', 'allSpirits', 'liqueurs', true);
  });

  it('should render Premixed button as not clickable if primary prop is "spirits" and secondary prop is "premixed"', () => {
    testLinkElement('spirits', 'premixed', 'premixed', false);
  });

  it('should render Premixed button as clickable if primary prop is "spirits" and secondary prop is not "premixed"', () => {
    testLinkElement('spirits', 'allSpirits', 'premixed', true);
  });

  it('should render Low Alcohol Spirits button as not clickable if primary prop is "spirits" and secondary prop is "lowAlcoholSpirits"', () => {
    testLinkElement('spirits', 'lowAlcoholSpirits', 'lowspirits', false);
  });

  it('should render Low Alcohol Spirits button as clickable if primary prop is "spirits" and secondary prop is not "lowAlcoholSpirits"', () => {
    testLinkElement('spirits', 'allSpirits', 'lowspirits', true);
  });
});
